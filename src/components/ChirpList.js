import React, { useContext } from "react";
import Chirp from './Chirp';
import "./ChirpList.css";
import { ChirpContext } from '../contexts/ChirpContext';

const ChirpList = () => {
    const { chirps, loader } = useContext(ChirpContext);
    return (
        <div className="chirp-list">
            {chirps.map((chirp) => {
                return <Chirp chirp={chirp} key={chirp.id} />;
            })}
            <div>
                {loader ? (
                    <div className="loader">
                        <span className="loader-content">
                            Loading_
                        </span>
                    </div>
                ) : (
                        ""
                    )}
            </div>
        </div>
    )
};
export default ChirpList;
