import {useState} from 'react'
import ErrorPage from './ErrorPage'

const PostingPage = ({posts, setPosts, user}) => {
    const [postDesc, setPostDesc] = useState('')
    const handleChange = (e) => {
        setPostDesc(e.target.value)
    }

    const handlePostSubmit = async () => {
        
        //API call

        try {
            const res = await fetch('http://localhost:5000/api/tweet/post', {
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
                setPosts([...posts, {username: user?.username, description: postDesc, date: new Date().toLocaleString(), name: user.name}])
            }
            else {
                console.log ('Some Error Occured')
                return <ErrorPage/>
            }
        } catch(err) {
            console.log ('Error Occured', err)
            return <ErrorPage/>
        }
        
    }


    return (
        <div className="posting-container">
            <textarea placeholder="What's happening" rows="7" cols="50" maxLength={250} value={postDesc} onChange={handleChange}></textarea>
            <button className="posting-btn" onClick={handlePostSubmit} ><i className="bi bi-send"></i> Post</button>
        </div>
    )
    
}

export default PostingPage