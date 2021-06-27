import 'firebase/storage';
import firebase from './firebase'

const storage = firebase.storage();

export async function uploadFileAsync(path, file) {
    let ref = storage.ref(path);
    let rs = await ref.put(file)
    let fullPath = rs._delegate.metadata.fullPath;
    let url = await storage.ref(fullPath).getDownloadURL()
    return {fullPath, url};
}
export function uploadFile(path, file, action) {
    let ref = storage.ref(path);
    ref.put(file).then(rs => {
        if (action) {
            let fullPath = rs._delegate.metadata.fullPath;
            storage.ref(fullPath).getDownloadURL().then(rs => action(rs))
        }
    });
}
export async function uploadFileFromStringAsync(path, string) {
    let ref = storage.ref(path);
    let rs = await ref.putString(string, 'data_url')
    let fullPath = rs._delegate.metadata.fullPath;
    let url = await storage.ref(fullPath).getDownloadURL()
    return {fullPath, url};
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
