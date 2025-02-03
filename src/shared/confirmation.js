import React from "react";

const Confirmation = ({ isOpen, onConfirm, onCancel, confirmationMsg }) =>
{
    if (!isOpen) return null; 

    return (
        <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
                        <button type="button" className="btn-close" onClick={onCancel} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {confirmationMsg}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
