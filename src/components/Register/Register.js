import { useState } from 'react'
import './Register.css'
import { useNavigate }  from 'react-router-dom'
import { login, register } from '../config/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";


function Register() {
  const [user1, setUser] = useState()

  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const [loginLoading, setLoginLoading] = useState(true)

  const [switchbtn, setSwitchbtn] = useState(false)
  const navigate = useNavigate()



  const signUp = async () => {
    setLoginLoading(true)
    try {
      await register(form)
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {

          const uid = user.uid;
          // console.log(`user found ${uid}`)
          navigate('/dashboard')
          setUser(uid)
          // ...
        } else {
          console.log('user not found')
          navigate('/')
        }
      });
    

    } catch (e) {
      alert(e.message)
      return
    }
  }


  const signin = () => {
    const { email, password } = form
   
    setLoginLoading(false)
    try {
      login(email, password)
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {

          const uid = user.uid;
          // console.log(`user found ${uid}`)
          navigate('/dashboard')

        } else {
          console.log('user not found')
          navigate('/')

        }
      });

    } catch (error) {
      alert(error.message)
      

    }
   
   
  }

  const updateForm = (e, key) => {
    setForm({ ...form, [key]: e.target.value })
  }

  return <div className='background'>

  <div className='login-signup'>
    <img src="https://www.olx.com.pk/assets/iconOLXLogin_noinline.93e8a1a9cf50902ba5250814f57810ff.svg" className='olx-img' alt="olx icon" /> <br />
    <div className='wto'>WELCOME TO OLX</div>
    <div className='wto'>The trusted community of <br /> buyers and sellers</div>
    {switchbtn ?
      <div>
        <form onSubmit={signUp} action="">


        <input className='input' type='text' required onChange={(e) => updateForm(e, 'name')} placeholder="First Name" />
        <input className='input' type='email' required onChange={(e) => updateForm(e, 'email')} placeholder="Email" />
        <input className='input' type='password' required onChange={(e) => updateForm(e, 'password')} placeholder="Password" /> <br />
        {loading ?
      <img className='myImage' src='https://i.stack.imgur.com/MnyxU.gif' />
      :
      <button className='btn_signup' type='submit'>Register</button> } <br />
      </form>
      <button className='switchbtn' onClick={() => setSwitchbtn(false)}>i already have an account</button>
      </div>
       
       
       :  <div>
        <form onSubmit={signin} action="">


      <input className='input' type='email' required onChange={(e) => updateForm(e, 'email')} placeholder="Email" />
      <input className='input' type='password' required onChange={(e) => updateForm(e, 'password')} placeholder="Password" /> <br />
      {!loginLoading &&
      <img className='myImage' src='https://i.stack.imgur.com/MnyxU.gif' />
}
      <button id='btn_logi' type='submit' >Login</button> <br /> 
      </form>
      <button className='switchbtn' onClick={() => setSwitchbtn(true)}>i dont have'n account</button>

    </div>
        
      }
  </div>
      </div>

}
export default Register