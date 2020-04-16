let db = firebase.firestore();

export default {
    // Unit database CRUD requests
    createDoc(dataObj) {
        return db.collection("ideas").add(dataObj)
    },
    getAllDocs() {
        return db.collection("ideas").get();
    },
    getSingleDoc(id) {
        return db.collection("ideas").doc(id).get();
    },
    updateDoc(id, dataObj) {

        return db.collection("ideas").doc(id).update(dataObj);
    },
    deleteDoc(id) {
        return db.collection("ideas").doc(id).delete();
    }
}