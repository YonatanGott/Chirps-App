import React, { createContext, useState, useEffect } from "react";
import { getChirps } from '../lib/api';

export const ChirpContext = createContext();

const ChirpContextProvider = (props) => {
    const [chirps, setChirps] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        (async () => {
            setLoader(true);
            const response = await getChirps();
            const chirps = await response.data.tweets;
            setChirps (chirps);
            setLoader(false);
        })()
    }, []);

    return (
        <ChirpContext.Provider value={{ chirps,loader }}>
            {props.children}
        </ChirpContext.Provider>
    );
};

export default ChirpContextProvider;
