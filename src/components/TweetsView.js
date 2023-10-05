
import {Link } from 'react-router-dom'
const TweetsView = ({posts, pageNum, setPageNum, fetchData}) => {
    // console.log (posts?.results.length)
    
    let next = posts?.next
    let prev = posts?.previous 
    posts = posts?.results?.length>0 ? posts?.results?.sort(sortByDate) : []
    console.log (next, prev)
    return (
        <div className="tweetview-container">
            <h3>Recent Tweets</h3>
            {posts?.length == 0 ? <label>No Tweets Found</label> : 
            posts?.map((post, index) => {
                // console.log (post)
                const {user, username, date, description} = post
                const formattedDate = new Date(date).toLocaleString()
                // console.log (formattedDate)
                return (
                    <div className="tweet-container" key={index}> 
                        <div className="tweet-head"> 
                            <label className="tweet-name">{user?.name}</label>
                            <label><em>{`@${username}`}</em></label>
                            <label>{formattedDate} </label>                        
                        </div>
                        <div className="tweet-desc">{description}</div>
                    </div>
                )
            })}
            <footer className="footer-container">
                {prev ? <Link className="page-link" onClick={()=> {setPageNum(prev?.page); fetchData(prev?.page)}}>{prev?.page}</Link> : '' }
                {<Link className='current-page' >{pageNum}</Link>}
                {next ? <Link className="page-link" onClick={()=>{setPageNum(next?.page); fetchData(next?.page)}}>{next?.page}</Link> : '' }
            </footer>
        </div>
    )
}

export default TweetsView;

function sortByDate (a, b) {
    let date1 = new Date(a.date)
    let date2 = new Date(b.date)
    return date2-date1
}