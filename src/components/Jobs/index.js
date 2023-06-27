import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobItem from '../JobItem'
import UserProfile from '../UserProfile'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileStatus: apiConstants.initial,
    profileDetails: {},
    jobStatus: apiConstants.initial,
    jobDetails: [],
    searchInput: '',
    minPackage: '',
    employType: [],
  }

  componentDidMount() {
    this.getUserProfileDetails()
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({jobStatus: apiConstants.inProgress})
    const {searchInput, minPackage, employType} = this.state
    const employ = employType.join(',')
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employ}&minimum_package=${minPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobs = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePer: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({jobStatus: apiConstants.success, jobDetails: updatedJobs})
    } else {
      this.setState({jobStatus: apiConstants.failure})
    }
  }

  getUserProfileDetails = async () => {
    this.setState({profileStatus: apiConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const details = data.profile_details
      const updatedProfile = {
        name: details.name,
        profileImageUrl: details.profile_image_url,
        shortBio: details.short_bio,
      }
      this.setState({
        profileStatus: apiConstants.success,
        profileDetails: updatedProfile,
      })
    } else {
      this.setState({profileStatus: apiConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderLoader1 = () => (
    <div className="loader-container-1" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  changeUserInput = event => {
    this.setState({searchInput: event.target.value})
  }

  changeSalaryCategory = id => {
    this.setState({minPackage: id}, this.getJobsDetails)
  }

  renderProfileFailure = () => (
    <div>
      <button type="button">Retry</button>
    </div>
  )

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    return <UserProfile details={profileDetails} />
  }

  renderUserProfile = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case apiConstants.success:
        return this.renderProfileSuccess()
      case apiConstants.failure:
        return this.renderProfileFailure()
      case apiConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderJobFailure = () => (
    <div className="failure-container">
      <img
        alt="failure view"
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-header">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.getJobsDetails}
        className="retry-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderJobSuccess = () => {
    const {jobDetails} = this.state
    if (jobDetails.length < 1) {
      return (
        <div className="no-jobs-container">
          <img
            alt="no jobs"
            className="no-jobs-img"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          />
          <h1 className="no-jobs-header">No Jobs Found</h1>
          <p className="no-jobs-para">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list-container">
        {jobDetails.map(each => (
          <JobItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderJobs = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case apiConstants.success:
        return this.renderJobSuccess()
      case apiConstants.failure:
        return this.renderJobFailure()
      case apiConstants.inProgress:
        return this.renderLoader1()
      default:
        return null
    }
  }

  changeEmploymentType = id => {
    this.setState(
      pre => ({employType: [...pre.employType, id]}),
      this.getJobsDetails,
    )
  }

  renderProfileSection = () => (
    <div className="profile-filter-container">
      <div className="profile-container">{this.renderUserProfile()}</div>
      <hr className="separator" />
      <FiltersGroup
        employmentTypesList={employmentTypesList}
        salaryRangesList={salaryRangesList}
        changeSalaryCategory={this.changeSalaryCategory}
        changeEmploymentType={this.changeEmploymentType}
      />
    </div>
  )

  renderJobsSection = () => {
    const {searchInput} = this.state
    return (
      <div className="search-jobs-container">
        <div className="input-search-container">
          <input
            onChange={this.changeUserInput}
            className="jobs-input"
            placeholder="Search"
            value={searchInput}
            type="search"
          />
          <button
            className="search-jobs-button"
            onClick={this.getJobsDetails}
            type="button"
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="container-3">{this.renderJobs()}</div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div className="jobs-footer-bg">
          {this.renderProfileSection()}
          {this.renderJobsSection()}
        </div>
      </div>
    )
  }
}

export default Jobs
