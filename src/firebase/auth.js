import 'firebase/auth'
import firebase from './firebase';

const auth = firebase.auth();

export function onUserStateChange(action) {
    auth.onAuthStateChanged((user) => action && action(user));
}

export function getCurrentUser() {
    return auth.currentUser;
}

export function updateDisplayName(data, action) {
    let user = firebase.auth().currentUser;
    if (user) {
        user.updateProfile({displayName: data}).then(() => action && action())
    }
}

export function updatePhotoUrl(data, action) {
    let user = firebase.auth().currentUser;
    if (user) {
        user.updateProfile({photoURL: data}).then(() => action && action())
    }
}

export function loginWithGoogle(action) {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(rs => action && action(rs))
}

export function signOut(action) {
    auth.signOut().then(rs => action && action(rs))
}

