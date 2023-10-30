import dotenv from 'dotenv'
dotenv.config()

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "asii-tickets.firebaseapp.com",
    projectId: "asii-tickets",
    storageBucket: "asii-tickets.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

export default firebaseConfig