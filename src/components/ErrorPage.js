import { useNavigate } from "react-router-dom"


const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className="App">
            <h3>Something Went wrong</h3>
            <button className="posting-btn" onClick={()=>navigate('/')}>Retry</button>
        </div>
    )
}

export default ErrorPage