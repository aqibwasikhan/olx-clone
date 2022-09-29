import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { db, getuserData, getSearchAdd } from "../config/firebase";
import { Link } from "react-router-dom";
import './Dashboard.css'
import Alladds from "../Alladds/Alladds";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";

import { useHref, useNavigate } from 'react-router-dom'


const Dashboard = () => {
    const [userUid, setUserUid] = useState('')
    const [docsnap, setDocsnap] = useState({})
    const [queries, setQueries] = useState([])
    const [myAdd, setMyadd] = useState(false)
    const [myAddbtn, setMyAddbtn] = useState('all adds')
    const [docsnap2, setDocsnap2] = useState({})
    const [dropBtn, setDropbtn] = useState(false)
    const [profileBtn, setProfile] = useState(false)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [search, setSearch] = useState();
    const [showSearchAdd, setShowSearchAdd] = useState(undefined);
    // const [searchResult, setSearchresult] = useState(false)
    // const [searchDiv, setSearchDiv] = useState(true)
    const [dpImage,setDpImage] = useState()
    const [image,setImage] = useState()




    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserUid(user.uid)
                showUserdata(user.uid)
            } else {
                console.log('user not found')
            }
            getAlldoc()
        })
        imgCondition()
    }, [dpImage,myAdd])


    const logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log('ok')
            window.location.href = '/';
           
            
          
           

        }).catch((error) => {
            console.log(error)
        });
       
    }

    const showUserdata = async (user) => {
        try {
            const result = await getuserData(user)
            setDocsnap2(result)
            setDpImage(result.profilePic)
        } catch (error) {
            alert(error.message)
        }
    }
    function imgCondition(){
        // console.log('dp ka prop',props.dp)
        if(dpImage == undefined){
            setImage('https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png')
        }else(
            setImage(dpImage)
        )
    }


    const showdata = () => {
        openCloseprofile()
        setDropbtn(false)
    }

    function openCloseprofile() {
        setProfile(!profileBtn)
    }

    function adPost() {
        navigate('/postadd')
    }

    async function getAlldoc() {
        setLoading(true)

        try {
            const querySnapshot = await getDocs(collection(db, "Adds"));
            let data = []
            querySnapshot.forEach((doc) => {
                const add = { ...doc.data().input, id: doc.id }
                data.push(add)
            });
            setQueries(data)
            return data;

        } catch (error) {
            console.log('all fetching error', error)
        }
        finally {
            setLoading(false)
        }
    }
    const searchAdd = async () => {
        setLoadingSearch(true)

        try {
            const res = await getSearchAdd(search);
            setShowSearchAdd(res);
        } catch (error) {
            console.log('no match found')
            // setSearchDiv(false)


        }
        finally {
            setLoadingSearch(false)

        }

    };

    useEffect(() => {
        if (!search) { searchAdd(); }
    }, [search]);
  
  



    async function showAdd() {
        try {
            const q = query(collection(db, "Adds"), where("Uid", "==", userUid))
            const querySnapshot = await getDocs(q);
            let data = []
            querySnapshot.forEach((doc) => {
                data = [...data, doc.data()]
                console.log('firebase my ad --->', data)
            });
            setDocsnap(data)

        } catch (error) {
            console.log(error)
        }
        setMyadd(!myAdd)
        if (myAdd) {
            setMyAddbtn('my add')
        } else {
            setMyAddbtn('all adds')
        }

    }

    const isEmpty = () => search && showSearchAdd && !showSearchAdd.length && !loading;
    const NoResult = () => <div className="no_result">No Results Found!</div>

    return (
        <div>
            <div >
                <div className="header">

                    <div className="firstrow">
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
                    <div className="navbar">
                        <div>
                            <img src="https://www.olx.com.pk/assets/iconOLXLogin_noinline.93e8a1a9cf50902ba5250814f57810ff.svg" height={40} className='olx-img-icon' alt="olx icon" />
                        </div>
                        <div className="select_country">
                            <select name="contry" id="contry">
                                <option value="volvo"> Pakistan</option>
                                <option value="saab">karachi</option>
                                <option value="opel">lahore</option>
                                <option value="audi">islamabad</option>
                            </select>
                        </div>
                        <div className="search">
                            <div className="input-div">
                                <input  onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Find Cars, Mobile Phones and more..." className="search_input" />
                                <button onClick={searchAdd} className="searchbtn"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 1024 1024" className="searchsvg">
                                    <path d="M448 725.33c-152.92 0-277.33-124.41-277.33-277.33S295.08 170.67 448 170.67 725.33 295.08 725.33 448 600.92 725.33 448 725.33zm436.44 98.78v.02L732.52 672.19c48.77-61.78 78.15-139.54 78.15-224.19 0-199.98-162.7-362.67-362.67-362.67S85.33 248.03 85.33 448c0 199.98 162.69 362.67 362.67 362.67 84.63 0 162.41-29.38 224.17-78.15l206.14 206.15h60.36v-60.33l-54.23-54.23z"></path></svg></button>

                            </div>

                        </div>
                        <div className="chat">
                            <img src="https://www.olx.com.pk/assets/iconChat_noinline.31f5df4a6a21fc770ed6863958662677.svg" alt="" />
                        </div>

                        <div className="notification">
                            <img src="https://www.olx.com.pk/assets/iconNotifications_noinline.4444f6b42acbe30d772d80ef1225f574.svg" alt="" />
                        </div>
                        <div className="profile_img">
                            <img src={image} alt="profile" style={{borderRadius:'50%'}} width={35} height={35} />
                        </div>
                        <div className="profile_select">
                            <div className="dropdown" >
                                <button onClick={() => setDropbtn(!dropBtn)} style={{ border: "none" }} className="dropbtn"><img src="https://www.olx.com.pk/assets/iconArrowDown_noinline.ec05eae7013321c193965ef15d4e2174.svg" width={17} height={17} alt="" /></button>
                                <div className="dropdown-content" style={{ display: dropBtn ? 'block' : 'none' }} >
                                    <div className="pr">
                                        <img src={image} alt="profile" style={{borderRadius:'50%'}} className="imagdrop"  width={50} height={50} />

                                        <div className="hello">
                                            Hello, <br />
                                            <b>{docsnap2.name}</b> <br />
                                            <button onClick={showdata} className="view_profile">View and edit your profile</button>
                                        </div>

                                    </div>
                                    <hr />
                                    <div className="content">

                                        <button onClick={showAdd} className="myadd_btn" ><img src="https://www.olx.com.pk/assets/iconMyAds_noinline.81f6b0cc8a3d16d363fb142e1489d035.svg" alt="" /><div>{myAddbtn}</div> </button>
                                        <button className="buy_btn"><img src="https://www.olx.com.pk/assets/iconBusinessPackages_noinline.64a7db94ef2eb1776d43916ce82b1a40.svg" alt="" /><div>Buy busuness and packages</div> </button>
                                        <button className="bought_btn"><img src="https://www.olx.com.pk/assets/iconBoughtPackages_noinline.b29b2b61c39def95f4bf58ac5b6dbb59.svg" alt="" /><div>Bought packages &amp; Biling</div> </button>
                                        <hr />
                                        <button className="help_btn"><img src="https://www.olx.com.pk/assets/iconHelp_noinline.f07d255148323e318808a50c52097d0c.svg" alt="" /><div>Help</div></button>
                                        <button className="setting_btn"><img src="https://www.olx.com.pk/assets/iconFilters_noinline.0aa1e7bd623dcbcc065196fa3ccba789.svg" alt="" /><div>Setting</div> </button>
                                        <hr />
                                        <button onClick={logOut} className="logout_btn"><img src="https://www.olx.com.pk/assets/iconLogout_noinline.9da9ed94dfe84e900cc1ae3198b0375b.svg" alt="" /><div> Logout</div> </button>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="sell">
                            <button onClick={adPost} className="sellbtn"> <img src="https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg" alt="sell" />
                                <div className="plus"><img src="https://www.olx.com.pk/assets/iconPlusSell_noinline.75fc7ea23e80b50447cf5757d8ef083a.svg" alt="" />
                                    <span>SELL</span></div></button>
                        </div>
                    </div>


                </div>
                <div className="category">
                    <div className="all_cate">ALL CATEGORIES&nbsp;<img src="https://www.olx.com.pk/assets/iconArrowDown_noinline.ec05eae7013321c193965ef15d4e2174.svg" width={17} height={17} alt="" /></div>
                    <div>Mobile Phones</div>
                    <div>Cars</div>
                    <div>Motorcycles</div>
                    <div>Houses</div>
                    <div>TV-Video-Audio</div>
                    <div>Tablets</div>
                    <div>Land &amp; Plots</div>
                </div>
                <hr className="hr" />
                <div className="sellitimg"  style={{ display: search ? 'none' : '' }}>
                    <img className="forwith" src="https://images.olx.com.pk/thumbnails/245178240-800x600.webp" alt="" />
                </div>

                <div style={{ display: profileBtn ? 'block' : 'none' }}>
                    <Profile close={openCloseprofile} name={docsnap2.name} dp={dpImage} email={docsnap2.email}/>

                </div>
                {!!loadingSearch && <div className='load_img' id="load_img">
                    <img className='myImage' style={{ width: '20%' ,marginTop:'10px !important' }} src='https://i.pinimg.com/originals/75/9c/22/759c22458ddb79bddc794bee5c18bb9f.gif' />
                </div>}

                {isEmpty() && <NoResult />}

                {search &&  (showSearchAdd || []).map((item) => {
                        console.log( 'search ad',item)
                        return ( <span onClick={() => navigate(`/details/${item.id}`)}>

                            <Alladds title={item.title} url={item.Url} price={item.price} location={item.location} />
                        </span>
                        )
                    })
                }

                <ul className="cards" style={{ display: search && 'none' }}>
                    {loading ? <div className='load_img'>
                        <img className='myImage' style={{ width: '10%', height: '10%' }} src='https://i.pinimg.com/originals/75/9c/22/759c22458ddb79bddc794bee5c18bb9f.gif' />
                    </div> : <div>
                    </div>}

                    {myAdd ?
                        docsnap.map(item => {
                            return (
                                <li><Alladds title={item.input.title} url={item.input.Url} price={item.input.price} location={item.input.location} /></li>

                            )
                        })


                        :
                        queries.map(blog => {
                            return (
                                <li onClick={() => navigate(`/details/${blog.id}`)}><Alladds title={blog.title} url={blog.Url} price={blog.price} location={blog.location} /></li>

                            )
                        })}
                </ul>



            </div>
            <Footer />

        </div>
    )
}

export default Dashboard