import React, { useContext, useState } from "react";
import "./ChirpForm.css";
import firebase from '../firebase/firebase';
import { ChirpContext } from '../contexts/ChirpContext';
import SignUp from './SignUp';
import { auth } from '../firebase/firebase';


const ChirpForm = () => {
    const [content, setContent] = useState("");
    const [chirpBtn, setChirpBtn] = useState(false);
    const { userName, userPic } = useContext(ChirpContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content) {
            return;
        }
        let strDate = new Date().toISOString();
        let chirpDate = strDate.split('T').join(' ');
        firebase
            .firestore()
            .collection('chirps')
            .add({
                content: content,
                userName: userName,
                userPic: userPic,
                date: chirpDate,
            })
            .then(() => {
                setContent("")
            })
    };

    const handleChange = (e) => {
        setContent(e.target.value);
        let charLen = e.target.value.length;
        setChirpBtn(false);
        if (charLen > 140) {
            setChirpBtn(true);
        }
    };

    const [signedIn, setSignedIn] = useState(false)
    auth.onAuthStateChanged(user => {
        if (user) {
            setSignedIn(true);
        } else {
            setSignedIn(false)
        }
    });


    if (signedIn) {
        return (
            <form className="form-group chirp-form" onSubmit={handleSubmit}>
                <textarea
                    className="form-control input-text"
                    rows="5"
                    cols="30"
                    type="text"
                    placeholder="What you have in mind..."
                    value={content}
                    onChange={handleChange}
                />
                <div className="form-footer">
                    <div className="overflow">
                        {chirpBtn ? (
                            <div className="btn text-overflow_btn">
                                <span className="text-overflow">
                                    _The Chirp can't contain more than 140 char.
                            </span>
                            </div>
                        ) : (
                                ""
                            )}
                    </div>
                    <div className="chirp-btn">
                        <button className="btn" id="btn" type="submit" disabled={chirpBtn}>
                            <span className="btn__content">Chirp_</span>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
    else {
        return (
            <SignUp />
        )
    }
};

export default ChirpForm;
