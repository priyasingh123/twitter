import {useState} from 'react'

const CreateAccount = () => {

    const accountDetails = {
        name: '',
        username: '',
        email: '',
        password: ''
    }
    const [details, setDetails] = useState(accountDetails)

    const handleSignUp = async (e) => {
        
        //clear form 
        const updatedDetails = {...details}
        for (let key in details) {
            updatedDetails[key] = ""
        }
        setDetails(updatedDetails)


        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        })
        console.log (res.status)

    }

    const handleChange = (e) => {
        setDetails({...details, [e.target.name]: e.target.value})
    }


    return (
        <div className="signup-container">
            <h1 className="signup-heading">Sign Up</h1>
            <label className="signup-heading">Its free and simple</label>
            <hr></hr>
            {/* used bubbling on form for onChange event*/}
            <form className="create-account-form" onChange={handleChange}>
                <input className="signup-input" value={details.name} name="name"  placeholder="name"/>
                <input className="signup-input" value={details.username} name="username" placeholder="username"/>
                <input className="signup-input" value={details.email} name="email" placeholder="email"/>
                <input className="signup-input" value={details.password} name="password" placeholder="password"/>
                <button className="create-btn signup-btn" style={{height:"35px", width:"30%"}} onClick={(e)=>handleSignUp(e)}>Sign Up</button>
            </form>
            
        </div>
    )
}

export default CreateAccount;