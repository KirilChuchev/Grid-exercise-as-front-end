let db = firebase.firestore();

export default {

    // User Register, Login, Logout
    login(username, password) {
        return firebase.auth().signInWithEmailAndPassword(username, password)
    },
    register(username, password) {
        return firebase.auth().createUserWithEmailAndPassword(username, password)
    },
    logout() {
        return firebase.auth().signOut();
    },


    // Users database CRUD requests
    createDoc(dataObj) { // POST Request
        return db.collection("users").add(dataObj)
    },
    getSingleDoc(id) { // GET Request
        return db.collection("users").doc(id).get();
    },
    getAllDocs() { // GET Request
        return db.collection("users").get();
    },
    updateDoc(id, dataObj) {  // PUT Request
        return db.collection("users").doc(id).update(dataObj);
    },
    deleteDoc(id) { // Delete Request
        return db.collection("users").doc(id).delete();
    }
}