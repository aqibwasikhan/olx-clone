import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div>
            <div className='footer_img' style={{width:'100vw'}} >
                <img style={{width:'100vw',height:'100%',cursor:'pointer'}} src="https://firebasestorage.googleapis.com/v0/b/temp-login-68d4d.appspot.com/o/addsImaages%2Ffooter.png?alt=media&token=26a50803-8651-48a5-b92f-00409b012eb3" width={100} height={100} alt="" />
            </div>
            <div className="footer">

                <div className="popular">
                    POPULAR CATEGORIES <br />
                    
                       <span> Cars </span><br />
                       <span>Flats for rent</span> <br />
                       <span>Mobile Phones</span><br />
                       <span>Jobs</span><br />
                


                </div>
                <div className="trend">
                    TRENDING SEARCHES <br />
                    <span> Bikes </span><br />
                       <span>Watches</span> <br />
                       <span>Books</span><br />
                       <span>Dogs</span><br />
                   
                </div>
                <div className="about">
                    ABOUT US <br />
                    <span>About EMPG</span><br />
                       <span>OLX Blog</span> <br />
                       <span>Contact Us</span><br />
                       <span>OLX for Businesses</span><br />
                </div>
                <div className="olx">
                    OLX<br />
                    <span> Help </span><br />
                       <span>Sitemap</span> <br />
                       <span>Terms of use</span><br />
                       <span>Privacy Policy</span><br />
                   
                </div>
                <div className="follow" style={{marginRight: '0vw'}}>
                    FOLLOW US
                    <span style={{ margin: '1vw'}}><img style={{ marginRight: '5px' }} src="https://www.olx.com.pk/assets/iconAppStoreEN_noinline.a731d99c8218d6faa0e83a6d038d08e8.svg" alt="" />
                        <img style={{ marginRight: '5px' }} src="https://www.olx.com.pk/assets/iconAppGallery_noinline.6092a9d739c77147c884f1f7ab3f1771.svg" alt="" />
                        <img src="https://www.olx.com.pk/assets/iconGooglePlayEN_noinline.9892833785b26dd5896b7c70b089f684.svg" alt="" /></span>
                </div>

            </div>
        </div>
    )
}

export default Footer