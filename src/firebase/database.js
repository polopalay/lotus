import 'firebase/database';
import firebase from './firebase'

const database = firebase.database();

export function getRowOneTime(ref, action) {
    database.ref(ref).once('value').then(rs => action(rs.val()))
}
export function getRow(ref, action) {
    database.ref(ref).on('value', rs => action(rs.val()))
}
export function getRowFromLastOneTime(ref, number, action) {
    database.ref(ref).limitToLast(number).once('value').then(rs => action(rs.val()))
}
export function getRowFromFirst(ref, number, action) {
    database.ref(ref).limitToFirst(number).on('value', rs => action(rs.val()))
}
export function getRowFromLast(ref, number, action) {
    database.ref(ref).limitToLast(number).on('value', rs => action(rs.val()))
}
export function getRowByParrentIdFromLastOneTime(ref, number, name, id, action) {
    database.ref(ref).orderByChild(name).equalTo(id).limitToLast(number).once('value').then(rs => action && action(rs.val()))
}
export function getRowByParrentIdOneTime(ref, name, id, action) {
    database.ref(ref).orderByChild(name).equalTo(id).once('value').then(rs => action && action(rs.val()))
}
export function getRowByParrentId(ref, name, id, action) {
    database.ref(ref).orderByChild(name).equalTo(id).on('value', rs => action && action(rs.val()))
}
export function addRow(ref, data, action) {
    let rs = database.ref(ref).push(data)
    rs.then(result => action && action(result))
    return rs.key;
}
export function deleteRow(ref, id, action) {
    database.ref(ref).child(id).remove().then(rs => action && action(rs))
}
export function editRow(ref, id, data, action) {
    database.ref(ref).child(id).update(data).then(rs => action && action(rs))
}
