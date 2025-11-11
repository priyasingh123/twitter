import {useState} from 'react'
import ErrorPage from './ErrorPage'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import UserInfoContext from '../utils/context/userInfo';
import { API_BASE_URL } from '../utils/base/baseURI';

const PostingPage = ({posts, setPosts}) => {
    const {user} = useContext(UserInfoContext)
    const navigate = useNavigate()
    const [postDesc, setPostDesc] = useState('')
    const handleChange = (e) => {
        setPostDesc(e.target.value)
    }

    const handleLogOut = () => {
        localStorage.removeItem('authToken')
        navigate('/')
    }

    const handlePostSubmit = async () => {
        
        //API call
        try {
            const res = await fetch(`${API_BASE_URL}/tweet/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    'description': postDesc
                })
            })
            if (res.status === 200) {
                console.log (res.status)
                setPosts({...posts, 
                    
                    results: [...posts.results, {username: user?.username, description: postDesc, date: new Date().toLocaleString(), user: {name: user.name}}]
                    
                })
            }
            else {
                console.log ('Some Error Occured')
                return <ErrorPage/>
            }
        } catch(err) {
            console.log ('Error Occured', err)
            return <ErrorPage/>
        }
        finally{
            setPostDesc('')
        }
        
    }


    return (
        <div className="posting-container">
            <textarea className="posting-box" placeholder="What's happening?" rows="7" cols="50" maxLength={250} value={postDesc} onChange={handleChange}></textarea>
            <button className="posting-btn" onClick={handlePostSubmit} ><i className="bi bi-send"></i> Post</button>
            <button className="logout-btn" onClick={handleLogOut} >Log Out</button>
        </div>
    )
    
}

export default PostingPage