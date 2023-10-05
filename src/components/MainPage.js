import ErrorPage from "./ErrorPage";
import ProfilePage from "./ProfilePage";
import Tweets from "./Tweets";
import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate()
    const [tweets, setTweets] = useState([])
    const [pageNum, setPageNum] = useState(1)
    useEffect(() => {
        //fetch all tweets
        fetchData(pageNum)
    }, [])

    async function fetchData(page) {
        try {
            const res = await fetch(`http://localhost:5000/api/tweet/alltweets?page=${page}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('authToken')
                }
            })
            
            if (res.status === 200) {
                const result = await res.json()
                // console.log(result)
                setTweets(result)
            }
            else {
                navigate('/error')
            }
        } catch (err) {
            console.log(err, 'Error occured')
            return <ErrorPage />
        }
    }

    return (
        <div className="main-container">
            <ProfilePage fetchData={fetchData}/>
            <Tweets tweets={tweets} pageNum={pageNum} setPageNum={setPageNum} fetchData={fetchData}/>
        </div>
    )
}

export default MainPage;