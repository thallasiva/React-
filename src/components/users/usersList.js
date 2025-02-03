import React, { useState, useEffect } from "react";
import '../users/user.css';
import { useNavigate } from "react-router-dom";
import apiInstace from "../../interceptor/axiosInstance";
import { Api_url, USERS_LIST } from "../../services/apiservice";

const UserList = () => {

    const navigate = useNavigate();

    const [otpValidate, setotpValidateResponse] = useState(null);
    const [userResponse, setuserRespons] = useState([]);

    const doCreate = (e) => {
        e.preventDefault();
        navigate('/users/createUser');
    }

    useEffect(() => {
        const otpResp = JSON.parse(localStorage.getItem('otpValidateResponse'));
        if (otpResp && otpResp.data && otpResp.data.responseData) {
            console.log("otpResp", otpResp);
            setotpValidateResponse(otpResp);
        }
    }, []);

    useEffect(() => {
        if (otpValidate) {
            getUserList();
        }
    }, [otpValidate]);

    const getUserList = () => {
        let payload = {
            "REQ_ID": 6,
            "_USER_ID": otpValidate.data.responseData[1][0].userId
        }

        apiInstace.post(Api_url + USERS_LIST, payload).then((resp) => {
            if (resp.data.responseCode === 1) {
                alert("Fetch failed");
            } else {
                console.log("Response here", resp.data.responseData[1]);
                setuserRespons(resp.data.responseData[1])
            }

        }).catch(err => {
            console.error("Error occurred", err);
        });
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'activeBtn';
            case 'Invited':
                return 'invitedBtn';
            case 'Inactive':
                return 'inactivatedBtn';
            default:
                return '';
        }
    }

    // Function to handle button actions (Activate, Deactivate, Delete)
    const handleAction = (status, action) => {
        console.log("status",status);
        
        if (action === 'activate') {
            console.log("Activating user...");
            // Implement activation logic here
        } else if (action === 'deactivate') {
            console.log("Deactivating user...");
            // Implement deactivation logic here
        } else if (action === 'delete') {
            console.log("Deleting user...");
            // Implement deletion logic here
        }
    }

    return (
        <div className="container mt-3">
            <div className="mb-4">
                <div className="mb-4">
                    <span className="float-start">
                        <input type="text" placeholder="search" />
                    </span>
                    <button className="btn btn-primary float-end mb-3" onClick={doCreate}>Create User</button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Role</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userResponse.map(item => {
                            return (
                                <tr key={item.login_id}>
                                    <td>{item.user_name}</td>
                                    <td>{item.email_id}</td>
                                    <td>{item.role_name}</td>
                                    <td>{item.company_name}</td>
                                    <td>
                                        <button className={getStatusColor(item.status)}>{item.status}</button>
                                    </td>
                                    <td>
                                        {item.status === 'Active' ? (
                                            <>
                                                <button
                                                    className="btn btn-danger me-2 rounded-pill"
                                                    onClick={() => handleAction(item.status, 'deactivate')}
                                                >
                                                    Deactivate
                                                </button>
                                                <button
                                                    className="btn btn-danger rounded-pill"
                                                    onClick={() => handleAction(item.status, 'delete')}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        ) : item.status === 'Inactive' || item.status === 'Invited' ? (
                                            <>
                                                <button
                                                    className="btn btn-primary rounded-pill"
                                                    onClick={() => handleAction(item.status, 'activate')}
                                                >
                                                    Activate
                                                </button>
                                                <button
                                                    className="btn btn-danger ms-2 rounded-pill"
                                                    onClick={() => handleAction(item.status, 'delete')}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        ) : null}
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
