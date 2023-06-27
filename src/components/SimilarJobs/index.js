import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {details} = props
  const {
    companyLogoUrl,
    rating,
    title,
    jobDescription,
    employmentType,
    location,
  } = details

  return (
    <li className="similar-list">
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
      <h1 className="header2">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-container">
        <MdLocationOn className="logo-color" />
        <p className="job-location">{location}</p>
        <BsFillBriefcaseFill className="logo-color" />
        <p className="job-location">{employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarJobs
