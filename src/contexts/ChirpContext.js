import React, { createContext, useState, useEffect, useCallback } from "react";
import { getChirps, postChirp } from '../lib/api';
import { v4 as uuidv4 } from "uuid";

export const ChirpContext = createContext();

const ChirpContextProvider = (props) => {
    const [chirps, setChirps] = useState([]);
    const [userName, setUserName] = useState('Chirpy Chirp McChirpen');
    const [loader, setLoader] = useState(false);

    const fetchChirps = useCallback (async () => {
        setLoader(true);
        const response = await getChirps();
        const chirps = await response.data.tweets;
        setChirps(chirps);
        setLoader(false);
    },[]);

    useEffect(() => {
        fetchChirps();
        setInterval(fetchChirps, 40000);
    }, [fetchChirps]);

    const addUserName = (userName) => {
        setUserName(userName);
    }

    const addChirp = (content) => {
        const chirp = {
            content: content,
            userName: userName,
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
        <ChirpContext.Provider value={{ chirps, loader, addChirp, addUserName }}>
            {props.children}
        </ChirpContext.Provider>
    );
};

export default ChirpContextProvider;
