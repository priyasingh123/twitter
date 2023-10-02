import ErrorPage from "./ErrorPage";
import ProfilePage from "./ProfilePage";
import Tweets from "./Tweets";
import {useEffect, useState} from 'react'

const MainPage = ({user}) => {
    const [tweets, setTweets] = useState([])
    useEffect(() => {
        //fetch all tweets
        async function fetchData() {
            try {
                const res = await fetch('http://localhost:5000/api/tweet/getalltweets', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('authToken')
                    }
                })
                const result = await res.json()
                // console.log(result)
                setTweets(result)
            } catch (err) {
                console.log(err, 'Error occured')
                return <ErrorPage />
            }
        }
        fetchData()
    }, [])


    return (
        <div className="main-container">
            <ProfilePage user={user}/>
            <Tweets tweets={tweets} user={user}/>
        </div>
    )
}

export default MainPage;