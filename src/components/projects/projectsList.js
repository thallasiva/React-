import React from "react";
import { Link } from "react-router-dom";

const ProjectList = () => {

    return (
        <div className="p-4">
            <div className="mb-4">
                <div className="mb-4"><span className="float-start"> <input type="text" placeholder="search" /></span><button className="btn btn-primary float-end mb-3" > <Link to={'/projects/createProject'}> create project </Link></button> </div>
            </div>
            <table>
                <thead>
                    <th> Name </th>
                    <th> Start Date </th>
                    <th> End Date </th>
                    <th> Status </th>
                    <th> Action </th>
                </thead>
                <tbody>
                    <td> Siva </td>
                    <td> 27/01/2025 </td>
                    <td> 30/01/2025 </td>
                    <td> <button className="btn btn-success rounded-pill"> In Progress </button> </td>
                    <td> <button className="btn btn-secondary rounded-pill"> Archive </button> </td>
                </tbody>
            </table>
        </div>
    )

};

export default ProjectList;