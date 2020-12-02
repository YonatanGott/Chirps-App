import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ChirpForm.css";
import { postChirp } from "../lib/api";

const ChirpForm = () => {
    const [content, setContent] = useState("");
    const [chirpBtn, setChirpBtn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const chirp = {
            content: content,
            userName: "Yonatan",
            date: new Date().toISOString(),
            id: uuidv4(),
        };
        postChirp(chirp)
            .then((response) => console.log(response))
            .catch(() => alert("Server Problem"));
        setContent("");
    };

    const handleChange = (e) => {
        setContent(e.target.value);
        let charLen = e.target.value.length;
        setChirpBtn(false);
        if (charLen > 140) {
            setChirpBtn(true);
        }
    };

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
                            <span className="text-overflow btn__content">
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
};

export default ChirpForm;
