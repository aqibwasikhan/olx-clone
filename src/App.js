import './App.css';
import { useState , useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from '../src/components/config/router'



function App() {
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const uid = user.uid;
        console.log(`user found ${uid}`)
        setUserUid(uid)
        
        
        // ...
      } else {
        console.log('user not found')
      }
    });
    
  },[])
  const [useruid,setUserUid] = useState('')
  return (
    <div className="App">
      <Router useruid={useruid}/>


    </div>
  );
}

export default App;
