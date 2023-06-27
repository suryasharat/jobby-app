import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetailsStatus: apiConstants.initial,
    jobItemDetails: {},
    skills: {},
    similarJobs: {},
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({jobItemDetailsStatus: apiConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = data.job_details

      const updatedJobItem = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        rating: jobDetails.rating,
        title: jobDetails.title,
        location: jobDetails.location,
        packagePer: jobDetails.package_per_annum,
      }

      const updatedSkills = jobDetails.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))
      const updatedSimilar = data.similar_jobs.map(each => ({
        title: each.title,
        rating: each.rating,
        location: each.location,
        id: each.id,
        jobDescription: each.job_description,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
      }))

      this.setState({
        jobItemDetailsStatus: apiConstants.success,
        jobItemDetails: updatedJobItem,
        skills: updatedSkills,
        similarJobs: updatedSimilar,
      })
    } else {
      this.setState({jobItemDetailsStatus: apiConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetailsFailure = () => (
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
        onClick={this.getJobItemDetails}
        className="retry-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetailsSuccess = () => {
    const {jobItemDetails, skills, similarJobs} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      packagePer,
      employmentType,
      location,
      companyWebsiteUrl,

      jobDescription,
    } = jobItemDetails

    return (
      <>
        <div className="bg5">
          <div className="job-logo-rating-container">
            <img
              className="logo2"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title-rating-container">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="rating-star" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="salary-location-container">
            <div className="location-container">
              <MdLocationOn className="logo-color" />
              <p className="job-location">{location}</p>
              <BsFillBriefcaseFill className="logo-color" />
              <p className="job-location">{employmentType}</p>
            </div>
            <p className="job-package">{packagePer}</p>
          </div>
          <hr className="line-seperate" />
          <div className="visit-container">
            <h1 className="header2">Description</h1>
            <a
              className="visit"
              rel="noreferrer"
              target="_blank"
              href={companyWebsiteUrl}
            >
              Visit
              <FiExternalLink />
            </a>
          </div>

          <p className="job-description">{jobDescription}</p>

          <h1 className="header2">Skills</h1>
          <ul className="skill-container">
            {skills.map(each => (
              <li className="skill-list" key={each.name}>
                <img
                  className="skill-logo"
                  alt={each.name}
                  src={each.imageUrl}
                />
                <p className="job-description4">{each.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="header2">Similar Jobs</h1>
          <ul className="similar-container">
            {similarJobs.map(each => (
              <SimilarJobs key={each.id} details={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobItemDetails = () => {
    const {jobItemDetailsStatus} = this.state
    switch (jobItemDetailsStatus) {
      case apiConstants.success:
        return this.renderJobItemDetailsSuccess()
      case apiConstants.failure:
        return this.renderJobItemDetailsFailure()
      case apiConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container4">{this.renderJobItemDetails()}</div>
      </div>
    )
  }
}
export default JobItemDetails
