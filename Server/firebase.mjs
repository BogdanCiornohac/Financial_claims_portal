import dotenv from 'dotenv'
dotenv.config()

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "asii-tickets.firebaseapp.com",
    projectId: "asii-tickets",
    storageBucket: "asii-tickets.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app