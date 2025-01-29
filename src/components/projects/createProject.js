import React from "react";

const CreateProject = () => {

    return (
        <div className="p-4">
            <h3> Create Project </h3>
            <div className="form-group">
                <label> Project Name </label>
                <input type="tex" className="form-control" />
            </div>

            <div className="form-group">
                <label> Project Description </label>
                <textarea  rows={8} className="w-100" />
            </div>

            <button className="btn btn-primary ms-2 btn-sm"> Assign </button>

            <div className="border p-2 mt-3">

            </div>

            <div className="row">
                <div className="col-sm-6">
                    <label> Start Date </label>
                    <input type="date" className="form-control" />
                </div>
                <div className="col-sm-6">
                    <label> End Date </label>
                    <input type="date" className="form-control" />
                </div>
            </div>

            <div className="row">
                <div className="col-sm-6">
                    <label> Market </label>
                    <select className="w-100 form-control">
                        <option value={1}> One </option>
                        <option value={2}> Two </option>
                        <option value={3}> Three </option>
                    </select>
                </div>
                <div className="col-sm-6">
                    <label> Methodology </label>
                    <select className="w-100 form-control" >
                        <option value={1}> One </option>
                        <option value={2}> Two </option>
                        <option value={3}> Three </option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label> Notes </label>
                <textarea  rows={5} className="w-100" />
            </div>
            <div className="float-end mb-3">
                <button className="btn btn-primary ms-2 btn-sm"> Save </button>
                <button className="btn btn-primary ms-2 btn-sm"> Create </button>
                <button className="btn btn-primary ms-2 btn-sm"> Cancel </button>

            </div>
        </div>
    )

};

export default CreateProject;