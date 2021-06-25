import 'firebase/database';
import firebase from './firebase'

const database = firebase.database();
export function getRow(ref, action) {
    database.ref(ref).on('value', rs => action(rs.val()))
}
export function getRowFromFirst(ref, number, action) {
    database.ref(ref).limitToFirst(number).on('value', rs => action(rs.val()))
}
export function getRowFromLast(ref, number, action) {
    database.ref(ref).limitToLast(number).on('value', rs => action(rs.val()))
}
export function addRow(ref, data) {
    return database.ref(ref).push(data).key
}

export function deleteRow(ref, id) {
    database.ref(ref).child(id).remove()
}

export function editRow(ref, id, data) {
    database.ref(ref).child(id).update(data)
}

export function demo() {
    database.ref('/posts/')
}
