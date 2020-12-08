import React, { useRef, useState, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase, { auth } from "../firebase/firebase"
import './Sign.css'

export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signUp } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [error, setError] = useState("")


    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    const signInWithGoogle = () => {
        auth.signInWithPopup(googleProvider).then((res) => {
            console.log(res.user)
        }).catch((error) => {
            console.log(error.message)
        }).then( history.push("/") )
    }


    return (

        <div>
            <div className='signup-main'>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <div className="alert alert-info" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='form-group' id="email">
                        <label>Email</label>
                        <input className='form-control' type="email" ref={emailRef} required />
                    </div>
                    <div className='form-group' id="password">
                        <label>Password</label>
                        <input className='form-control' type="password" ref={passwordRef} required />
                    </div>
                    <div className='form-group' id="password-confirm">
                        <label>Password Confirmation</label>
                        <input className='form-control' type="password" ref={passwordConfirmRef} required />
                    </div>
                    <div className="btn-sign">
                    <button disabled={loading} className="btn" type="submit">
                        <span className="btn__content">Sign Up_</span>
                    </button>
                    </div>
                </form>
            </div>
            <div className="w-100 text-center mt-2 sign-foot">
                Have an account? <Link to="/signIn">Sign In</Link>
            </div>
            <div className="google-btn w-100 text-center mt-2">
                <button className="login-google " onClick={signInWithGoogle}>
                    <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
                    <span className="google-content"> Sign up with Google</span>
                </button>
            </div>
        </div>

    )
}