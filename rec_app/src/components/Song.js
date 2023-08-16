import { addDoc, collection } from 'firebase/firestore';
import {db } from '../services/firebase.config';

//Add Todo Handler
const submitSong = async (e) => {

    const collectionRef = collection(db, "test")
    
    let data = {
        test : e
    }
    try {
        console.log("submitting song")
        await addDoc(collectionRef, {
        data})
    } catch (err) {
        console.log(err);
    }
}

export default submitSong