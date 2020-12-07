import React, { useRef, useState, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import './Sign.css'

export default function SignIn() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { signIn } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [error, setError] = useState("")

    const handleSubmit = async function (e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await signIn(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    return (
        <div>
            <div className='signin-main'>
                <h2 className="text-center mb-4">Sign In</h2>
                {error && <div className="alert alert-info" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='form-group' id="email">
                        <label>Email</label>
                        <input className='form-control' type="email" ref={emailRef} required />
                    </div>
                    <div className='form-group' id="password">
                        <label>Password</label>
                        <input className='form-control' type="password" ref={passwordRef} required />
                    </div >
                    <div className="btn-sign">
                    <button disabled={loading} className="btn" type="submit">
                        <span className="btn__content">Sign In_</span>
                    </button>
                    </div>
                </form>
            </div>
            <div className="w-100 text-center mt-2 sign-foot">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}