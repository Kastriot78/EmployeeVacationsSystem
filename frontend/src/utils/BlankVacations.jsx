import React from 'react'
import { Link } from 'react-router-dom'

const BlankVacations = () => {
    return (
        <div className='blank_wrapper_div shadow px-4 py-5 rouned'>
            <p>You don't have any vacation requests yet!</p>
            <div className='text-center mb-3'>
                <img src='/images/empty_state.svg' alt='' />
            </div>
            <Link to="/home">Request a vacation</Link>
        </div>
    )
}

export default BlankVacations
