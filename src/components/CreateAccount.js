const CreateAccount = () => {
    return (
        <div className="signup-container">
            <h1 className="signup-heading">Sign Up</h1>
            <label className="signup-heading">Its free and simple</label>
            <hr></hr>
            <form className="create-account-form">
                <input className="signup-input" placeholder="name"/>
                <input className="signup-input" placeholder="username"/>
                <input className="signup-input" placeholder="email"/>
                <input className="signup-input" placeholder="password"/>
                <button className="create-btn signup-btn" style={{height:"35px", width:"30%"}}>Sign Up</button>
            </form>
            
        </div>
    )
}

export default CreateAccount;