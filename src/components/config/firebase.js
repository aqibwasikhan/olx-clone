import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore ,collection,where,getDocs,query,getDoc,doc,setDoc} from "firebase/firestore";
import { getStorage, ref , uploadBytes ,getDownloadURL} from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyDCdCPnBaPYCwxiGc9xaGGmwg-JqYrfoG0",
    authDomain: "temp-login-68d4d.firebaseapp.com",
    projectId: "temp-login-68d4d",
    storageBucket: "temp-login-68d4d.appspot.com",
    messagingSenderId: "860848807467",
    appId: "1:860848807467:web:a7c1903540aa0239e1546e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app);
let uid 

async function register(form) {
    const { name,email, password } = form

    await createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            // Signed in 
            const user = userCredential.user;
             uid = user.uid
            try {
                await setDoc(doc(db, "users" , uid), {
                email, name , uid
                });
                // console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            // ...
            console.log(`user found in firebase ${user.uid}`)
            alert('Successful!')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)

            alert(errorMessage , errorCode)
            // ..
        });
}
async function getuserData(userid){
  
    const docRef = doc(db, 'users', userid);
    const docSnap = await getDoc(docRef);
    // setDocsnap2(docSnap.data())
    return docSnap.data()


}


function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      // ...
      // alert('Successfully logged in!')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage , errorCode)
    });
  
}
async function getSearchAdd(title) {
  const q = query(collection(db, "Adds"), where("input.brand" , "==", title) || where("input.title" , "==", title))
  const querySnapshot = await getDocs(q);
  let data = []
  querySnapshot.forEach((doc) => {
    const add = { ...doc.data().input, id: doc.id }
    data.push(add)
});
return data
  
}
async function uploadimg(file){
  const imageRef = ref(storage, 'ProfileImaages/' + file.name);
  const uploadImage = await uploadBytes(imageRef, file);
  const imgUrl = await getDownloadURL(uploadImage.ref)
  return imgUrl
}
async function updateProfile(data){
    console.log('uid', auth.currentUser.uid)
    const curentUid = auth.currentUser.uid
    await setDoc(doc(db,'users',curentUid),data ,{merge: true})
 
}


export {
    register,
    login,
    getuserData,
    getSearchAdd,
    updateProfile,
    uploadimg,
    db, storage
}