import avatar from '../utils/img/avatar.jpg'

const ProfilePage = ({user}) => {
    return (
        <div className='outer-container'>
            <div className='profile-container'>
                <img src={avatar} style={{ width: "100px", height: "100px" }} />
                <label className='profile-name'>{user.name}</label>
            </div>
            <hr style={{width: "90%"}}></hr>
            <div>
                <label>421 tweets 200 followers 125 following</label>
            </div>
        </div>
    )
}
export default ProfilePage