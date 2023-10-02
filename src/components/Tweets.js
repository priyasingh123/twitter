import PostingPage from "./PostingPage"
import TweetsView from "./TweetsView"
import {useEffect, useState} from 'react'

const Tweets = ({tweets, user}) => {
    // console.log (tweets)
    const [posts, setPosts] = useState(tweets)

    useEffect (()=> {
        setPosts(tweets)
    }, [tweets])
    return (
        <div className="tweets-container">
        <PostingPage posts={posts} setPosts={setPosts} user={user}/>
        <TweetsView posts={posts}/>
        </div>
    )
}

export default Tweets;