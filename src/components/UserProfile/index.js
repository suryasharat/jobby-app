import './index.css'

const UserProfile = props => {
  const {details} = props
  const {name, shortBio, profileImageUrl} = details

  return (
    <div className="profile-card">
      <img className="profile-image" src={profileImageUrl} alt="profile" />
      <h1 className="profile-header">{name}</h1>
      <p className="profile-bio">{shortBio}</p>
    </div>
  )
}
export default UserProfile
