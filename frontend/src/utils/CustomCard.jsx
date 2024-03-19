import React from 'react'

const CustomCard = ({ title, subTitle, number }) => {
    return (
        <div className="custom-card card">
            <div className="card-body">
                <div className="card-item">
                    <div className="card-item-icon card-icon">
                        <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect height="14" opacity=".3" width="14" x="5" y="5"></rect><g><rect fill="none" height="24" width="24"></rect><g><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z"></path><rect height="5" width="2" x="7" y="12"></rect><rect height="10" width="2" x="15" y="7"></rect><rect height="3" width="2" x="11" y="14"></rect><rect height="2" width="2" x="11" y="10"></rect></g></g></g></svg>
                    </div>
                    <div className="card-item-title mb-2">
                        <label className="main-content-label tx-13 font-weight-bold mb-1">{title}</label>
                        <span className="d-block tx-12 mb-0 text-muted">{subTitle}</span>
                    </div>
                    <div className="card-item-body">
                        <div className="card-item-stat">
                            <h4 className="font-weight-bold">{number}</h4>
                            <small><b className="text-success">55%</b> higher</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomCard
