import React, { useState, useContext } from "react";
import "./ChirpForm.css";
import { ChirpContext } from "../contexts/ChirpContext";


const ChirpForm = () => {
    const [content, setContent] = useState("");
    const [chirpBtn, setChirpBtn] = useState(false);
    const { addChirp } = useContext(ChirpContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        addChirp(content);
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
};

export default ChirpForm;
