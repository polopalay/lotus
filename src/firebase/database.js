import firebase from './firebase'

const database = firebase.database();

export function addRow(ref, data) {
    database.ref(ref).push(data)
}

export function deleteRow(ref, id) {
    database.ref(ref).child(id).remove()
}

export function editRow(ref, id, data) {
    database.ref(ref).child(id).update(data)
}

export function demo() {
    //database.ref().child('posts').push({demo: ''}).then(rs=>console.log(rs));
    //database.ref('posts').once('value', snap => {
        //if (!snap.exists()) {
        //}
    //})
}
