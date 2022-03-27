import React, {createContext, useContext, useEffect, useState} from 'react';
import firebase from './firebase';
import Router from 'next/router';
import {createUser} from './db';

const authContext = createContext();

export function AuthProvider({children}) {
    const auth = useProviderAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
}

function useProviderAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser);
            createUser(user.uid, user);
            setLoading(false);
            setUser(user);
            return user;
        } else {
            setLoading(false);
            setUser(false);
            return false;
        }
    }

    const signinWithGithub = () => {
        setLoading(true);
        return firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => handleUser(response.user));
    }

    const signinWithGoogle = (redirect) => {
        setLoading(true);
        return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response) => {
                handleUser(response.user);
                if (redirect) {
                    Router.push(redirect);
                }
            });
    }

    const signUp = (email, password) => {
        setLoading(true);
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                handleUser(response.user);
            });
    }

    const signinWithEmail = (email, password) => {
        setLoading(true);
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                handleUser(response.user);
            });
    }

    const signout = () => {
        return firebase.auth().signOut().then(() => handleUser(false));
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        signinWithGithub,
        signinWithGoogle,
        signinWithEmail,
        signUp,
        signout,
    }
}

const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    };
};