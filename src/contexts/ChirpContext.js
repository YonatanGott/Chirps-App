import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const ChirpContext = createContext();

const ChirpContextProvider = (props) => {
    const [chirps, setChirps] = useState(() => {
        const localData = localStorage.getItem('chirps');
        return localData ? JSON.parse(localData) : [];
    });

    const addChirp = (text) => {
        setChirps([
            { text, user: 'Yonatan', date: new Date().toISOString(), id: uuidv4() }, ...chirps,
        ]);
    };

    useEffect(() => {
        localStorage.setItem('chirps', JSON.stringify(chirps));
    }, [chirps]);

    return (
        <ChirpContext.Provider value={{ chirps, addChirp }}>
            {props.children}
        </ChirpContext.Provider>
    );
};

export default ChirpContextProvider;
