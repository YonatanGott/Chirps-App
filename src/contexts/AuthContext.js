import React, { createContext, useState, useEffect } from "react"
import firebase,  { auth } from "../firebase/firebase"

export const AuthContext = createContext()


const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState([])
    const [loading, setLoading] = useState(true)


    const signUp = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            return firebase.firestore().collection('users').doc(cred.user.uid).set({
                userName: email
            });
        })
    };

    const signIn = (email, password) => {
        auth.signInWithEmailAndPassword(email, password)
    };

    const logOut = () => {
        auth.signOut()
    };

    const resetPassword = (email) => {
        auth.sendPasswordResetEmail(email)
    };

    const updateEmail = (email) => {
        currentUser.updateEmail(email)
    };

    const updatePassword = (password) => {
        currentUser.updatePassword(password)
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signIn,
        signUp,
        logOut,
        resetPassword,
        updateEmail,
        updatePassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;