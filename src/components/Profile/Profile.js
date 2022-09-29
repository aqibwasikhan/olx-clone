import './Profile.css'
import { updateProfile ,uploadimg } from '../config/firebase'
import { useEffect, useState } from 'react'
const Profile = (props) => {
    const [imageURl,setImageURl] = useState()
    const [image,setImage] = useState()
    useEffect(()=>{
        imgCondition()
    })
    const sumbit = async () =>{
        try {
            const url = await uploadimg(imageURl)
            await updateProfile({ profilePic: url})
            alert('profile update successfully')
        } catch (error) {
            console.log(error.message)
        }
    }
   function imgCondition(){
    // console.log('dp ka prop',props.dp)
    if(props.dp == undefined){
        setImage('https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png')
    }else(
        setImage(props.dp)
    )

}

  return (
    <div className="profile-comp" >
    <div>
        <button onClick={props.close} className="cros">
            <svg width="25" height="25" fillRule="evenodd" data-aut-id="icon" viewBox="0 0 1024 1024">
                <path d="M878.3 85.3L512 451.6 145.7 85.3H85.3v60.4L451.7 512 85.3 878.3v60.4h60.4L512 572.3l366.3 366.4h60.4v-60.4L572.4 512l366.3-366.3V85.3z" className="rui-22SD7"></path></svg>
        </button>
    </div>
    <img src={image} alt="profile pic" style={{borderRadius:'50%'}} width={100} height={100} /> <br />
    WELCOME TO YOUR PROFILE <br /><b style={{ letterSpacing: '2px', fontSize: '25px' }}>{props.name}</b>
    <div>
        <label htmlFor="img">Choose image For profile</label> <br />
        <input type="file"  onChange={(e) => setImageURl(e.target.files[0])}  name="img" id="" />
    </div>
    <div>
        <label htmlFor="Name">Name</label> <br />
        <input type="text"  placeholder={props.name} readOnly name="Name" id="" />
    </div>
    <div>
        <label htmlFor="Email">Email</label> <br />
        <input type="email" placeholder={props.email} readOnly name="Email" />
    </div>
    <div>
        <label htmlFor="Contact">Add Contact</label> <br />
        <input type="number" placeholder="For example: +923324401225" name="Contact" />
    </div>
    <div>
        <label htmlFor="adres">Add Address</label> <br />
        <textarea name="adres" placeholder='Address' id="" cols="50" rows="4"></textarea>
    </div>
    <div className="buttons">
        <button onClick={props.close} className="cncl">Cancel</button> <button onClick={sumbit} className="change">Save Changes</button>
    </div>


</div>
  )
}

export default Profile