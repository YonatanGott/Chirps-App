import React from "react";
import "./Chirp.css";

const Chirp = ({ chirp }) => {
    return (
        <div className="row chirp-list-row">
            <div className='chirp col-lg'>
                <div className='chirp-head'>
                    <div className="chirp-user">{chirp.userName}</div>
                    <div className="chirp-date">{chirp.date}</div>
                </div>
                <div className="chirp-text">{chirp.content}</div>
                <span class="chirp-label">{chirp.id}</span>
            </div>
        </div>
    );
};

export default Chirp;
