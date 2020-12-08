import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import firebase from '../firebase/firebase';
import { AuthContext } from '../contexts/AuthContext';


export const ChirpContext = createContext();

const chirpsRef = firebase
    .firestore()
    .collection('chirps')
    .orderBy('date', "desc")
    .limit(10);

const ChirpContextProvider = (props) => {
    const [loader, setLoader] = useState(false);
    const [fireChirps, setFireChirps] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [userName, setUserName] = useState(currentUser ? currentUser.email : 'Chirpy Chirp');
    const [userPic, setUserPic] = useState(null);
    // const [lastChirp, setLastChirp] = useState(null);

    const addUserName = (userName) => {
        setUserName(userName);
    }

    const addUserPic = (userPic) => {
        setUserPic(userPic);
    }

    const fetchChirps = useCallback(async () => {
        setLoader(true);
        const unsubscribe = chirpsRef
            .onSnapshot(snapShot);
        setLoader(false);
        return () => unsubscribe()
    }, []);

    useEffect(() => {
        fetchChirps();
    }, [fetchChirps]);


    const snapShot = (snapshot) => {
        const chirps = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setFireChirps(chirps);
    }

    const chirpShot = (snapshot) => {
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    const handleOnLoadMore = async () => {
        const getChirps = await chirpsRef
            .startAfter(fireChirps[fireChirps.length - 1].date)
            .get();
        const chirpsDocs = chirpShot(getChirps);
        setFireChirps ((fireChirps) => [...fireChirps, ...chirpsDocs]);
    }

    return (
        <ChirpContext.Provider value={{ fireChirps, loader, userName, addUserName, addUserPic, userPic, handleOnLoadMore }}>
            {props.children}
        </ChirpContext.Provider>
    );
};

export default ChirpContextProvider;
