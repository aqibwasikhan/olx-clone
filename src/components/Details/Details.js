import React from 'react'
import './Details.css'
import Footer from '../Footer/Footer'
import { useState , useEffect } from 'react'
import { db ,getuserData } from '../config/firebase'
import { getDoc,doc } from 'firebase/firestore'
import { useNavigate ,useParams } from 'react-router-dom'


const Details = () => {
    const [ad,setad] = useState()
    const [sellerDetail,setSellerdetail] = useState({})
    const params = useParams()
    const navigate = useNavigate()
    const { addId } = params
    useEffect(() => {
        getAddbyid()         
    },[])
  

     const getAddbyid =  async () =>{
        const docRef = await doc(db, "Adds" , addId)
        const docSnap = await getDoc(docRef)
        setad(docSnap.data().input)

        showUserdata(docSnap.data().Uid);
     }
     const showUserdata = async (uid) =>{
        try {
            const result = await getuserData(uid)
            setSellerdetail(result)            
        } catch (error) {
            console.log(error.message)
            
        }
    }
 
       
     if(!ad){
        return <div className='load_img'>
            <img className='myImage' style={{width:'10%',height:'10%'}}  src='https://i.pinimg.com/originals/75/9c/22/759c22458ddb79bddc794bee5c18bb9f.gif' />
        </div>
     }


    return (
        <div>
            <div className='header_detail'>

                <div className="firstrow">
                    <div className="back_Arow">
                        <button style={{ border: 'none', background: 'transparent',cursor:'pointer'}} onClick={() => navigate('/dashboard')}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024" className="_5cd47560">
                                <path d="M512 124.16v54.83L209.7 473.17l676.96.05L925.48 512l-38.82 38.78H209.75L512 845.01v54.87h-56.32L85.33 539.43v-54.86l370.35-360.4H512z"></path></svg>
                        </button>
                    </div>

                    <div className="olxicone">
                        <svg height="5" viewBox="0 0 36.289 20.768" alt="Olx logo" className="olxsvg">
                            <path
                                d="M18.9 20.77V0h4.93v20.77zM0 10.39a8.56 8.56 0 1 1 8.56 8.56A8.56 8.56 0 0 1 0 10.4zm5.97-.01a2.6 2.6 0 1 0 2.6-2.6 2.6 2.6 0 0 0-2.6 2.6zm27 5.2l-1.88-1.87-1.87 1.88H25.9V12.3l1.9-1.9-1.9-1.89V5.18h3.27l1.92 1.92 1.93-1.92h3.27v3.33l-1.9 1.9 1.9 1.9v3.27z"
                            />
                        </svg>
                    </div>
                    <div className="header_motor">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" alt="OLX Motors" className="OLX_Motors"><defs><linearGradient id="a" x1=".5" x2=".5" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#ddd"></stop><stop offset="1" stopColor="#fff"></stop></linearGradient></defs>
                            <path fill="url(#a)" d="M0 16.5a16.5 16.5 0 1 1 33 0 16.5 16.5 0 0 1-33 0z" opacity=".6"></path>
                            <path d="M24.7 13.5a1.1 1.1 0 0 0-1.4-.7l-.6.2-1-2.2-.4-.1a16 16 0 0 0-4.8-.7 12 12 0 0 0-4.3.7l-.3.1-1 2.3h-.5a1.1 1.1 0 0 0-.6 2v.2a4 4 0 0 0-.4 1.5v4a2.1 2.1 0 0 0 0 .6.7.7 0 0 0 .8.5h1.6a.7.7 0 0 0 .8-.5 2.1 2.1 0 0 0 0-.7v-.3a47.1 47.1 0 0 0 8.3 0v.3a2.1 2.1 0 0 0 0 .7.7.7 0 0 0 .8.5h1.6a.7.7 0 0 0 .7-.5 2.1 2.1 0 0 0 .1-.7v-4a3.7 3.7 0 0 0-.4-1.5V15h.3a1.1 1.1 0 0 0 .7-1.5zm-12.2-2.1a11.3 11.3 0 0 1 4-.6 15.2 15.2 0 0 1 4.6.6l.9 1.8a17.6 17.6 0 0 1-4.3.4H17a28.2 28.2 0 0 1-5.4-.3zm-.6 9.3a2.2 2.2 0 0 1 0 .4h-1.7a2.2 2.2 0 0 1 0-.4V20a1 1 0 0 0 .3 0l1.4.2v.4zm11.4 0a2.2 2.2 0 0 1 0 .4h-1.6a2.2 2.2 0 0 1 0-.4v-.4H23a1 1 0 0 0 .4-.2zm.5-6.5l-1.2.4.5 1a3 3 0 0 1 .3 1.2V18l-.1.7c0 .3-.2.7-.5.7-3 .3-4.5.5-6 .5s-3-.2-6.2-.5c-.2 0-.3-.3-.4-.6V18a17 17 0 0 1 0-1 3.2 3.2 0 0 1 .3-1.3l.5-1-1-.2a.3.3 0 0 1-.2-.4.3.3 0 0 1 .4-.3l1.1.4a23.6 23.6 0 0 0 5 .3h1.4a17.9 17.9 0 0 0 4.6-.5h.3l1-.4a.3.3 0 0 1 .4.3.3.3 0 0 1-.2.4z"></path>
                            <path d="M12 16a1.2 1.2 0 1 0 1.1 1.2A1.2 1.2 0 0 0 12 16zm0 1.6a.4.4 0 1 1 .3-.4.4.4 0 0 1-.4.4zm9.6-1.6a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2zm0 1.6a.4.4 0 1 1 .5-.4.4.4 0 0 1-.5.4zm-7.8.2h6v.8h-6z"></path></svg>

                    </div>
                    <div className="motor">MOTORS</div>

                    <div className="header_property">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" alt="OLX Property" className="OLX_Property"><defs><linearGradient id="a" x1=".5" x2=".5" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#ddd"></stop><stop offset="1" stopColor="#fff"></stop></linearGradient></defs>
                            <path fill="url(#a)" d="M0 16.5a16.5 16.5 0 1 1 33 0 16.5 16.5 0 0 1-33 0z" opacity=".57"></path>
                            <path d="M25.03 21.92v-9.35l-4.99-1.66v1.05l4 1.33v8.59h-5V7.85h-8.38v14.08h-.4v1h15.17v-1zm-6.98-11.68v11.68h-6.4V8.84h6.4z"></path><path d="M15.17 10.3h1.61v.8h-1.6zm-2.42 0h1.6v.8h-1.6zm2.42 1.6h1.61v.81h-1.6zm-2.42 0h1.6v.81h-1.6zm2.42 2.42h1.61v.81h-1.6zm-2.42 0h1.6v.81h-1.6zm2.42 1.62h1.61v.8h-1.6zm-2.42 0h1.6v.8h-1.6zm2.42 2.42h1.61v.8h-1.6zm-2.42 0h1.6v.8h-1.6zm8.87-4.04h.8v.81h-.8zm-1.62 0h.8v.81H20zm1.62 1.62h.8v.8h-.8zm-1.62 0h.8v.8H20zm1.62 2.42h.8v.8h-.8zm-1.62 0h.8v.8H20z"></path></svg>

                    </div>
                    <div className="property">PROPERTY</div>

                </div>
            </div>
            <div className="sellitimg" style={{marginTop:'82px'}}>
                <img className="forwith" src="https://images.olx.com.pk/thumbnails/245178240-800x600.webp" alt="" />
            </div>
            <div className="content_detail">
                <div className='content_1'>
         
                    <div className="gallery">
                        <div className="back_img">
                            <div style={{ height: '100%', width: '100%' }} >
                                <img className='img_ad' src={ad.Url} width={100} height={100} alt="Add image" />
                            </div>

                        </div>
                    </div>
                    <div className='info'>
                        <div className="details">
                            <span className='info_title'>Details</span>
                            <div className='info_detail'>
                                <div className="flexix">
                                    <div className="flexix_1">
                                        <span className='price_info'>Price</span>
                                        <span>{ad.price}</span>
                                    </div>

                                </div>
                                <div className="flexix">
                                    <div className="flexix_1">
                                        <span className='price_info'>Brand</span>
                                        <span>{ad.brand}</span>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div>
                            <span className='info_title'>Description</span>
                            <div className='div_text'>
                                <span>{ad.description}</span>

                            </div>
                        </div>


                    </div>

                </div>
                <div className="content_2">
                    <div className="title_detail">
                        <div className='title_text'>
                            <div className="price_icons">
                                <div style={{ display: 'flex' }}>
                                    <span className='price_title'>Rs {ad.price} </span>
                                </div>
                                <div className="share_heart">
                                    <div className="share_div">
                                        <img src="https://www.olx.com.pk/assets/iconShare_noinline.41d8fa8326fea7b27bc24d3eca8b598a.svg" alt="share" />
                                    </div>
                                    <div className="share_div">
                                        <img width={25} height={25} src="https://www.olx.com.pk/assets/iconFavoriteUnselected_noinline.5767fec1cf12da79531e7c0b4a94f4e2.svg" alt="share" />
                                    </div>

                                </div>

                            </div>

                        </div>
                        <p>{ad.title}</p>
                        <div style={{ color: `rgba(0,47,52,.64)` }}>{ad.location}</div>

                    </div>
                    <div className="title_detail">
                        <div className='seller'>Seller Discripton</div>
                        <div className='user'>
                            <img src="https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png" width={60} height={60} alt="" />
                            <div className='guest'>{sellerDetail.name}</div>
                        </div>
                        <div className='chat_div'>
                            <button onClick={showUserdata}>Chat with Seller</button>

                        </div>
                    </div>
                    <div className="title_detail">
                    <div className='seller'>Posted In</div>
                    <div style={{ color: `rgba(0,47,52,.64)` }}>{ad.location}</div>
                    <div className="articalmap">

                    <div className="map">
                    </div>
                    </div>



                    </div>



                </div>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default Details