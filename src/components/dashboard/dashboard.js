import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Api_url, USERS_LIST } from '../../services/apiservice';
import apiInstace from '../../interceptor/axiosInstance';

const Dashboard = () => {
    const [userLength, setUsersLength] = useState(0);  // Initialize as number
    const [projectsLength, setProjectsLength] = useState(0);  // Initialize as number
    const [otpValidate, setotpValidateResponse] = useState(null);

    const sidemenu = [
        { id: 1, menu_name: "Home" },
        { id: 2, menu_name: "Users" },
        { id: 3, menu_name: "Projects" },
    ];

    useEffect(() => {
        const otpResp = JSON.parse(localStorage.getItem('otpValidateResponse'));
        if (otpResp && otpResp.data && otpResp.data.responseData) {
            console.log("otpResp", otpResp);
            setotpValidateResponse(otpResp);
        }
    }, []); // Only fetch the OTP response once on mount

    useEffect(() => {
        if (otpValidate) {
            usersList();
            projectsList();
        }
    }, [otpValidate]);  // Fetch users and projects once otpValidate is set

    const usersList = () => {
        if (!otpValidate) return;

        let payload = {
            "REQ_ID": 6,
            "_USER_ID": otpValidate.data.responseData[1][0].userId,
        };

        apiInstace.post(Api_url + USERS_LIST, payload).then((resp) => {
            if (resp.data.responseCode === 1) {
                alert("Fetching is an invalid request");
            } else {
                console.log("Response Data:", resp.data.responseData[1]);
                setUsersLength(resp.data.responseData[1].length);  // Update state with length
            }
        }).catch(err => {
            console.error("Error occurred", err);
        });
    };

    const projectsList = () => {
        if (!otpValidate) return;

        let payload = {
            "REQ_ID": 15,
            "_USER_ID": otpValidate.data.responseData[1][0].userId,
        };

        apiInstace.post(Api_url + USERS_LIST, payload).then((resp) => {
            if (resp.data.responseCode === 1) {
                alert("Fetching is an invalid request");
            } else {
                console.log("Response Data:", resp.data.responseData[1]);
                setProjectsLength(resp.data.responseData[1].length);  // Update state with length
            }
        }).catch(err => {
            console.error("Error occurred", err);
        });
    };

    const currDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', weekday: 'long' });

    return (
        <div>
            <header>
                <h2>Cities</h2>
            </header>

            <section>
                <nav>
                    <ul>
                        {sidemenu.map(item => (
                            <li key={item.id}><a href="#">{item.menu_name}</a></li>
                        ))}
                    </ul>
                </nav>

                <article>
                    <h1>Home</h1>
                    <p>{currDate}</p>

                    <div className='d-flex'>
                        <div className='card p-4 rounded-pill'>
                            <Link to={'/projects/projectsList'}>  {projectsLength} Projects </Link>
                        </div>
                        <div className='card p-4 rounded-pill ms-4'>
                            <Link to={'/users/usersList'} >  {userLength} Users </Link>
                        </div>
                    </div>
                </article>
            </section>

            <footer>
                <p>Footer</p>
            </footer>
        </div>
    );
};

export default Dashboard;
