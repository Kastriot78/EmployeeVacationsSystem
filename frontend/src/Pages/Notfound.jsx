import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
    return (
        <div className='login_wrapper not_found'>
            <div className="row auth_main">
                <div className="col-md-6 d-none d-md-block">
                    <div className='bg-image notfound-bg-image'></div>
                </div>
                <div className="col-md-6 auth-form-wrapper">
                    <div className='form-section'>
                        <div>
                            <h4 className='title1'>404</h4>
                            <h4 className='title2'>LOOKS LIKE YOU'RE LOST</h4>
                            <h4 className='title3'>The Page You Are Looking For Not Available!</h4>
                            <Link to="/" className='auth-btn'>Go to Login Page</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notfound
