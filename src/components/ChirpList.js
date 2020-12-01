import React, { useContext } from "react";
import Chirp from './Chirp';
import "./ChirpList.css";
import { ChirpContext } from '../contexts/ChirpContext';

const ChirpList = () => {
    const { chirps } = useContext(ChirpContext);
    return (
        <div className="chirp-list">
            {chirps.map((chirp) => {
                return <Chirp chirp={chirp} key={chirp.id} />;
            })}
        </div>
    )
};
export default ChirpList;
