const PostingPage = () => {
    return (
        <div className="posting-container">
            <textarea placeholder="What's happening" rows="7" cols="50" maxLength={250}></textarea>
            <button className="posting-btn"><i className="bi bi-send"></i> Post</button>
        </div>
    )
    
}

export default PostingPage