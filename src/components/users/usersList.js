import React from "react";
import '../users/user.css';
import { useNavigate } from "react-router-dom";

const UserList = () => {

    const navigate = useNavigate();

   const doCreate = (e) => {
        e.preventDefault();
        navigate('/users/createUser');
    }

    return (


       

        <div className="container mt-3">
            <div className="mb-4">
                <div className="mb-4"><span className="float-start"> <input type="text" placeholder="search"/></span><button className="btn btn-primary float-end mb-3" onClick={doCreate}> create user</button> </div>
            </div>
            <table>
                <thead>
                    <th> Name </th>
                    <th> Email Address </th>
                    <th> Role </th>
                    <th> Company Name </th>
                    <th> Status </th>
                    <th> Action </th>
                </thead>
                <tbody>
                    <td> Siva </td>
                    <td> Siva@gmail.com </td>
                    <td> Super Admin </td>
                    <td> Testing </td>
                    <td> <button className="btn btn-primary btn-sm" > Active </button> </td>
                    <td> <button className="btn btn-dark btn-sm"> Active </button> <button className="btn btn-danger btn-sm"> Delete </button> </td>
                </tbody>
            </table>
        </div>
    )

};

export default UserList;