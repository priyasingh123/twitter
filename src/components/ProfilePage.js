import avatar from '../utils/img/avatar.jpg'
import {useState, useEffect} from 'react'
import { useContext } from 'react'
import UserInfoContext from '../utils/context/userInfo'

const ProfilePage = ({fetchData}) => {
    const {user} = useContext(UserInfoContext)
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        //API call to fetch non following
        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/user/notfollowed', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('authToken')
                    }
                })
                if (res.status == 200) {
                    const response = await res.json()
                    setSuggestions(response)
                }
                else {
                    console.log ('handle Error')
                }
                
            } catch (err) {
                console.log ('Error Occured')
            }
            
        }
        fetchUsers()
        
    },[])

    const handleFollow = async(suggestion) => {
        // console.log ('follow clicked',suggestion)
        //API call to follow 
        try {
            const res = await fetch('http://localhost:5000/api/user/adduser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                },
                body: JSON.stringify({ 'email': suggestion.email })
            })
            if (res.status == 200) {
                const updatedSuggestion = suggestions.filter ((suggest) => {
                    return suggest.email !== suggestion.email
                })
                setSuggestions(updatedSuggestion)
                fetchData()
            }
            else {
                console.log ('Some error Occured')
            }
        } catch (err) {
            console.log ('Error Occured')
        }
    }

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
            <hr style={{width: "90%"}}></hr>
            <div className='suggestion-container'>
                <label style={{fontWeight: '500'}}>Who to Follow ?</label>
                {suggestions?.map ((suggestion) => {
                    return (
                        <div key={suggestion.email} className="suggestion-item">
                            <label>{suggestion.name}</label>
                            <button className='posting-btn' onClick={()=>handleFollow(suggestion)}>Follow</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default ProfilePage