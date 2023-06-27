import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    title,
    rating,
    packagePer,
    employmentType,
    location,
    id,
    jobDescription,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="job-item-list">
        <div className="job-logo-rating-container">
          <img className="logo2" src={companyLogoUrl} alt="company logo" />
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
        <h1 className="header2">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
