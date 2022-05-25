import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {

    apiKey: "AIzaSyBwHIcu4-uzYpea0a2KWEq41yi1who0G0k",
    authDomain: "expense-tracker-cddde.firebaseapp.com",
    projectId: "expense-tracker-cddde",
    storageBucket: "expense-tracker-cddde.appspot.com",
    messagingSenderId: "523594746439",
    appId: "1:523594746439:web:5a961bc7695a11eeefff62",
    measurementId: "G-E2YN7FEHG8"


}


const fire = firebase.initializeApp(config);

export default fire;