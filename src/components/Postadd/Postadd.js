import { useState, useEffect } from 'react';
import './Postadd.css'
import { storage, db } from '../config/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom'



const Postadd = () => {
    const [Uid, setUid] = useState('')
    const [file, setFile] = useState()
    const [input, setInput] = useState({})
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()







    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {

                setUid(user.uid)
                console.log('post ad ki uid', user.uid)
            } else {
                console.log('user not found')
            }



        })



    }, [])

    console.log('dusra console', Uid)
    const updateForm = (e, key) => {
        setInput({ ...input, [key]: e.target.value })



    }
    function navigation(){
        navigate('/dashboard')
    }
    const PostAdd = async (e) => {
        e.preventDefault()
        const imageRef = ref(storage, 'addsImaages/' + file.name);
        const uploadImage = await uploadBytes(imageRef, file);
        const downloadUrl = await getDownloadURL(uploadImage.ref)
        setUrl(downloadUrl)
        setLoading(true)


        try {
            await addDoc(collection(db, "Adds"), {
                input: { ...input, Url: downloadUrl }, Uid
            });

        } catch (error) {
            alert('Unsucceccfull posting')
            console.log(error.message)

        } finally {
            setLoading(false)
            navigation()
        }




    }
    console.log(input)
   
    return (
        <div>
            <div className="header_post">
                <div className="bacArow">
                    <button style={{ border: 'none', background: 'transparent' }} onClick={navigation}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024" className="_5cd47560">
                            <path d="M512 124.16v54.83L209.7 473.17l676.96.05L925.48 512l-38.82 38.78H209.75L512 845.01v54.87h-56.32L85.33 539.43v-54.86l370.35-360.4H512z"></path></svg>
                    </button>
                </div>
                <span className='post_your'>Post Your Add</span>
            </div>
            <div className='cate'>
                <div className='select-cate'>
                    SELECTED CATEGORY
                </div>
            </div>
            <div className='post-content'>
                <form style={{ marginTop: '0em' }} onSubmit={PostAdd}>
                    <div className='include'>
                        INCLUDE SOME DETAILS
                    </div>
                    <div>
                        <div className='i_d_1'>
                            <label htmlFor="title">Add Title</label>
                            <div className="d_i_1">
                                <input type="text" required onChange={(e) => updateForm(e, 'title')} placeholder="Enter Ad Title" className='input_1' name='title' />

                            </div>

                        </div>
                        <div className='i_d_2' >
                            <label htmlFor="discription">Description</label>
                            <div className='d_i_2'>
                                <textarea name="discripton" required onChange={(e) => updateForm(e, 'description')} placeholder="Enter Add Description" maxlength="4096" id="" ></textarea>

                            </div>
                        </div>
                        <div className='i_d_1'>
                            <label htmlFor="brand">Brand</label>
                            <div className="d_i_1">
                                <input type="text" required onChange={(e) => updateForm(e, 'brand')} placeholder="Enter Brand" className='input_1' name='brand' />

                            </div>

                        </div>
                        <div className='hr'>
                        </div>
                        <div className='set_price'>
                            SET A PRICE

                        </div>
                        <div className='i_d_1'>
                            <label htmlFor="price">Price</label>
                            <div className="d_i_1">
                                <input type="text" required onChange={(e) => updateForm(e, 'price')} placeholder="Enter price" className='input_1' name='price' />

                            </div>

                        </div>
                        <div className='hr'>
                        </div>
                        <div className='set_price'>
                            UPLOAD PHOTO

                        </div>
                        <div className='i_d_1' >
                            <label className='upload' htmlFor="file">
                                <div className='upload_div'>
                                    <img src="https://www.olx.com.pk/assets/iconAddPhoto_noinline.8924e2486f689a28af51da37a7bda6ec.svg" className='upload_img' alt="" />
                                    <input className='upload_div_input' type="file" name='image' onChange={(e) => setFile(e.target.files[0])} />
                                </div>

                            </label>

                        </div>
                        <div className='hr'>
                        </div>
                        <div className='set_price'>
                            YOUR AD,S LOCATION

                        </div>
                        <div className='i_d_1'>
                            <label htmlFor="location">Location</label>
                            <div className="d_i_1">
                                <input type="text" required onChange={(e) => updateForm(e, 'location')} placeholder="Location" className='input_1' name='location' />

                            </div>

                        </div>
                        <div className='hr'>
                        </div>
                        <div className='div_btn'>
                            {loading ?
                                <img className='myImage' src='https://i.stack.imgur.com/MnyxU.gif' /> :
                                <button type='submit'>Post Now</button>
                            }
                        </div>
                        <div className='hr'>
                        </div>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default Postadd