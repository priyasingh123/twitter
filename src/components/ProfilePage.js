import avatar from '../utils/img/avatar.jpg'
import {useState, useEffect} from 'react'

const ProfilePage = ({user}) => {
    const [userInfo, setUserInfo] = useState(user)
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        setUserInfo(user)
    },[user])

    useEffect(() => {
        //API call to fetch non following
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/user/getnonfollowing', {
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
        fetchData()
        
    },[])

    const handleFollow = async(suggestion) => {
        // console.log ('follow clicked',suggestion)
        //API call to follow 
        try {
            const res = await fetch('http://localhost:5000/api/user/addtofollowing', {
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
                <label className='profile-name'>{userInfo.name}</label>
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