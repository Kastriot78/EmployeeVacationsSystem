import BtnLoader from '../utils/BtnLoader';

const DeleteModal = ({ show, setShow, handleDelete, loading }) => {
    return (
        <div id="delete-modal" className={`modal fade delete-modal ${show ? 'show' : ''}`}>
            <div className={`overlay ${show ? 'active' : ''}`} onClick={() => setShow(false)}></div>
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-header flex-column">
                        <div className="icon-box">
                            <svg
                                x="0px"
                                y="0px"
                                width="17px"
                                height="16px"
                                viewBox="-0.26 -0.512 17 16"
                                enableBackground="new -0.26 -0.512 17 16"
                                xmlSpace="preserve"
                            >
                                <line
                                    stroke="currentColor"
                                    strokeMiterlimit={10}
                                    x2="0.583"
                                    y2="14.593"
                                    x1="15.895"
                                    y1="0.353"
                                />
                                <line
                                    stroke="currentColor"
                                    strokeMiterlimit={10}
                                    x2="15.896"
                                    y2="14.593"
                                    x1="0.584"
                                    y1="0.353"
                                />
                            </svg>
                        </div>
                        <h4 className="modal-title w-100">Are you sure?</h4>
                        <button type="button" className="close" onClick={() => setShow(false)} aria-hidden="true">
                            <svg
                                x="0px"
                                y="0px"
                                width="17px"
                                height="16px"
                                viewBox="-0.26 -0.512 17 16"
                                enableBackground="new -0.26 -0.512 17 16"
                                xmlSpace="preserve"
                            >
                                <line
                                    stroke="currentColor"
                                    strokeMiterlimit={10}
                                    x2="0.583"
                                    y2="14.593"
                                    x1="15.895"
                                    y1="0.353"
                                />
                                <line
                                    stroke="currentColor"
                                    strokeMiterlimit={10}
                                    x2="15.896"
                                    y2="14.593"
                                    x1="0.584"
                                    y1="0.353"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Do you really want to delete this vacation? This process cannot be undone.</p>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                            {loading ? <BtnLoader /> : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;
