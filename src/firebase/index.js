import firebase from 'firebase/app'
import 'firebase/database';
const config = {
  apiKey: "AIzaSyCkJpnc2XujWAQSmTRnGyXQY1G0fk6i2F4",
  authDomain: "profile-ad8a2.firebaseapp.com",
  databaseURL: "https://profile-ad8a2.firebaseio.com",
  projectId: "profile-ad8a2",
  storageBucket: "profile-ad8a2.appspot.com",
  messagingSenderId: "495401607514"
}
firebase.initializeApp(config);
export default firebase.database();