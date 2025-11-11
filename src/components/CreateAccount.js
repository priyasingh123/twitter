import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/base/baseURI';

const CreateAccount = () => {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const [errorCls, setErrorCls] = useState('without-error')
    const accountDetails = {
        name: '',
        username: '',
        email: '',
        password: ''
    }
    const [details, setDetails] = useState(accountDetails)

    const handleSignUp = async (e) => {
        e.preventDefault();
        //clear form 
        const updatedDetails = {...details}
        for (let key in details) {
            updatedDetails[key] = ""
        }
        setDetails(updatedDetails)

        let response
        try {
            const res = await fetch(`${API_BASE_URL}/user/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(details)
            })
            response = await res.json()
            if (res.status === 200) {
                navigate('/')
            }
            else{
                console.log (response[0].msg)
                setErrorMsg(response[0].msg)
                setErrorCls('with-error')
            }
        } catch (err) {
            console.log (err)
            setErrorMsg(response?.msg)
            setErrorCls('with-error')
        }
    }

    const handleChange = (e) => {
        setErrorCls('without-error')
        setDetails({...details, [e.target.name]: e.target.value})
    }


    return (
        <div className="signup-container">
            <label className={`signup-heading ${errorCls}`}>{errorMsg}</label>
            <h1 className="signup-heading">Sign Up</h1>
            <label className="signup-heading">Its free and simple</label>
            <hr></hr>
            {/* used bubbling on form for onChange event*/}
            <form className="create-account-form" onChange={handleChange}>
                <input className="signup-input" value={details.name} name="name"  placeholder="name"/>
                <input className="signup-input" value={details.username} name="username" placeholder="username"/>
                <input className="signup-input" value={details.email} name="email" placeholder="email"/>
                <input className="signup-input" value={details.password} type="password" name="password" placeholder="password"/>
                <div className='btn-group'>
                    <button className="create-btn signup-btn" style={{height:"35px", width:"30%"}} onClick={(e)=>handleSignUp(e)}>Sign Up</button>
                    <button className="create-btn signup-btn" style={{height:"35px", width:"30%", backgroundColor: '#3d71e0'}} onClick={()=>navigate('/')}>Sign In</button>

                </div>
            </form>
            
        </div>
    )
}

export default CreateAccount;