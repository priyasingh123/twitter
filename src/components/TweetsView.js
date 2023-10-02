

const TweetsView = ({posts}) => {
    
    posts = posts.sort(sortByDate)
    return (
        <div className="tweetview-container">
            <h3>Recent Tweets</h3>
            
            {posts?.map((post) => {
                // console.log (post)
                const {name, username, date, description} = post
                const formattedDate = new Date(date).toLocaleString()
                // console.log (formattedDate)
                return (
                    <div className="tweet-container" key={post.date }> 
                        <div className="tweet-head"> 
                            <label className="tweet-name">{name}</label>
                            <label><em>{`@${username}`}</em></label>
                            <label>{formattedDate} </label>                        
                        </div>
                        <div className="tweet-desc">{description}</div>
                    
                    </div>
                )
            })}
        </div>
    )
}

export default TweetsView;

function sortByDate (a, b) {
    let date1 = new Date(a.date)
    let date2 = new Date(b.date)
    return date2-date1
}