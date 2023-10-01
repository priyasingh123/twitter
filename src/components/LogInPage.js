import {useState} from 'react'
import {useNavigate} from 'react-router-dom';

const LogInPage = () => {
    let navigate = useNavigate()
    const signInDetails = {
        email: '',
        password: ''
    }

    const [details, setDetails] = useState(signInDetails)
    const handleChange = (e) => {
        setDetails({...details, [e.target.name]: e.target.value})
    }

    const handleSignIn = async () => {
        //API call 
        console.log(JSON.stringify(details))
        const res = await fetch ('http://localhost:5000/api/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        } )
        console.log (res.status)
    }

    const handleCreateAccount = () => {
        navigate('/create-new')
    }

    return (
        <div className="login-container">
            <h1>Sign In</h1>
            <div className="email-container">
                <label className="email-label">Email: </label>
                <input className="email-input" onChange={handleChange} name="email" value={details.email}/>
            </div>
            <div className="password-container">
                <label className="password-label">Password: </label>
                <input value={details.password} onChange={handleChange} name="password" className="password-input" type="password" />
            </div>
            <div className="submit-container">
                <button className="submit-button" onClick={handleSignIn}>Submit</button>
            </div>
            <button className="create-btn" onClick={handleCreateAccount} >Create Account</button>
        </div>
    )
}

export default LogInPage;