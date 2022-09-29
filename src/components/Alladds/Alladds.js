import React from 'react'
import './Alladds.css'

const Alladds = (props) => {
    return (
        <div className='allcard'>
            <div className='card_img'>
                <img src={props.url} className='img-card' width={100} height={100} alt="bikeimage" />

            </div>
            <div className='detail'>

                <div>
                     {props.title}
                    <div className='heart'>
                    <img src="https://www.olx.com.pk/assets/iconFavoriteUnselected_noinline.5767fec1cf12da79531e7c0b4a94f4e2.svg"  width={20} height={20} alt="" />
                    </div>
                </div>
                <div className='rs'>
                    <b> RS {props.price} </b>
                </div>

                <div className='location'>
                    <b>Location : </b> {props.location}
                </div>
            </div>




        </div>
    )
}

export default Alladds