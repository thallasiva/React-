import React from "react";

const CreateUser = () => {

    return (
        <div>
            <div className="row">
                <div className="col-sm-6">
                    <label> First name </label>
                    <input type="text" className="form-control" />
                </div>
                <div className="col-sm-6">
                    <label> First name </label>
                    <input type="text" className="form-control" />
                </div>
            </div>

            <div className="form-group">
                <label> Enter Email Address </label>
                <input type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label> Comapny Name </label>
                <input type="text" className="form-control" />
            </div>

            <button className="btn btn-danger w-100 mt-4"> Submit </button>
        </div>
    )

};

export default CreateUser;