import 'firebase/storage';
import firebase from './firebase'

const storage = firebase.storage();

export function uploadFile(path, file, action) {
    let ref = storage.ref(path);
    ref.put(file).then(rs => {
        if (action) {
            let fullPath = rs._delegate.metadata.fullPath;
            storage.ref(fullPath).getDownloadURL().then(rs => action(rs))
        }
    });
}
export function uploadFileFromString(path, string, action) {
    let ref = storage.ref(path);
    ref.putString(string, 'data_url').then(rs => {
        if (action) {
            let fullPath = rs._delegate.metadata.fullPath;
            storage.ref(fullPath).getDownloadURL().then(rs => action(rs))
        }
    })
}

export function deleteFile(path) {
    storage.ref(path).delete().catch(error => console.log(error));
}
