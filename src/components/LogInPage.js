import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import ErrorPage from './ErrorPage';

const LogInPage = ({setUser}) => {
    let navigate = useNavigate()
    const signInDetails = {
        email: '',
        password: ''
    }

    const [details, setDetails] = useState(signInDetails)
    const [errorMsg, setErrorMsg] = useState('')
    const [errorCls, setErrorCls] = useState('without-error')
    const handleChange = (e) => {
        setErrorCls('without-error')
        setDetails({...details, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        localStorage.removeItem('authToken')
    },[])

    const handleSignIn = async () => {
        //API call 
        try {
            const res = await fetch('http://localhost:5000/api/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(details)
            })
            const response = await res.json()
            //successfull login
            if (res.status == 200) {
                setUser(response.user_info)
                localStorage.setItem('authToken', response.authToken)
                navigate('/tweet')
            }
            else {
                console.log (response.error)
                setErrorMsg(response.error)
                setErrorCls('with-error')
            }
        } catch (err) {
            setErrorMsg('Server Crashed')
            setErrorCls('with-error')
            console.log (err)
        }
        setDetails({email: '', password:''})
    }

    const handleCreateAccount = () => {
        navigate('/create-new')
    }

    return (
        <div className="login-container">
            <label className={errorCls}>{errorMsg}</label>
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