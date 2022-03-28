import firebase from './firebase';

const firestore = firebase.firestore();

export function updateUser(uid, data) {
    return firestore.collection('users').doc(uid).update(data);
}

export function createUser(uid, data) {
    return firestore.collection('users').doc(uid).set({uid, ...data}, {merge: true});
}

export function createFeedback(data) {
    return firestore.collection('feedback').add(data);
}

export function createSite(data) {
    const site = firestore.collection('sites').doc();
    site.set(data);
    return site;
}