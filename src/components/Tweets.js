import PostingPage from "./PostingPage"
import TweetsView from "./TweetsView"
import {useEffect, useState} from 'react'

const Tweets = ({tweets, user, pageNum, setPageNum , fetchData}) => {
    // console.log (tweets)
    const [posts, setPosts] = useState(tweets)

    useEffect (()=> {
        setPosts(tweets)
    }, [tweets])
    return (
        <div className="tweets-container">
        <PostingPage posts={posts} setPosts={setPosts} user={user}/>
        <TweetsView posts={posts} pageNum={pageNum} setPageNum={setPageNum} fetchData={fetchData}/>
        </div>
    )
}

export default Tweets;