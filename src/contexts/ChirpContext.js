import React, { createContext, useState, useEffect } from "react";
import { getChirps, postChirp } from '../lib/api';
import { v4 as uuidv4 } from "uuid";

export const ChirpContext = createContext();

const ChirpContextProvider = (props) => {
    const [chirps, setChirps] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        (async () => {
            setLoader(true);
            const response = await getChirps();
            const chirps = await response.data.tweets;
            setChirps(chirps);
            setLoader(false);
        })()
    }, []);

    const addChirp = (content) => {
        const chirp = {
            content: content,
            userName: "Yonatan",
            date: new Date().toISOString(),
            id: uuidv4(),
        };
        setChirps([
            chirp,
            ...chirps,
        ]);
        postChirp(chirp)
            .then((response) => console.log(response))
            .catch(() => alert("Server Problem"));
    };

    return (
        <ChirpContext.Provider value={{ chirps, loader, addChirp }}>
            {props.children}
        </ChirpContext.Provider>
    );
};

export default ChirpContextProvider;
