import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import firebase from '../firebase/firebase';
import { AuthContext } from '../contexts/AuthContext';


export const ChirpContext = createContext();

const ChirpContextProvider = (props) => {
    const [loader, setLoader] = useState(false);
    const [fireChirps, setFireChirps] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [userName, setUserName] = useState(currentUser ? currentUser.email : 'Chirpy Chirp');
    const [lastVisible, setLastVisible] = useState(null);

    const addUserName = (userName) => {
        setUserName(userName);
    }

    const fetchChirps = useCallback(async () => {
        setLoader(true);
        const ref = firebase
        .firestore()
        .collection('chirps')
        .orderBy('date', "desc");

        ref.limit(6).get().then(function (documentSnapshots) {
        setLastVisible (documentSnapshots.docs[documentSnapshots.docs.length-1])
        });
        const unsubscribe = ref
            .startAfter(lastVisible)
            .limit(6)
            .onSnapshot((snapshot) => {
                const arr = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setFireChirps(arr)
            }, err => console.log(err.message));
        setLoader(false);
        return () => unsubscribe()
    }, [lastVisible]);

    useEffect(() => {
        fetchChirps();
    }, [fetchChirps]);

    return (
        <ChirpContext.Provider value={{ fireChirps, loader, userName, addUserName }}>
            {props.children}
        </ChirpContext.Provider>
    );
};

export default ChirpContextProvider;
