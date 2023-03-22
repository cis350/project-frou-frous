export const Register = (props) => {
    return (
        <div className="auth-form-container">
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <label htmlfor="email">Email</label>
                <input placeholder="username" id="username" name="username"/>
                <button type="submit">Save Password</button>

            </form>
            <button className="link-button" onClick={()=>props.onFormSwitch('login')}>Already have an Account? Sign in</button>

        </div>
    )
}