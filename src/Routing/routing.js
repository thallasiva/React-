import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../components/authentication/login";
import ForgotPassword from '../components/authentication/forgot-password';
import OTP from '../components/authentication/otp';
import Dashboard from '../components/dashboard/dashboard';
import UserList from '../components/users/usersList';
import CreateUser from '../components/users/createUsers';
import ProjectList from '../components/projects/projectsList';
import CreateProject from '../components/projects/createProject';
import EditProject from '../components/projects/editProject';

const Routing = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/otp' element={<OTP />} />

                    {/* dashboard routes */}
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/users/usersList' element={<UserList />} />
                    <Route path='/users/createUser' element={<CreateUser />} /> 

                    {/* projects list */}
                    <Route path='/projects/projectsList' element={<ProjectList />} />
                    <Route path='/projects/createProject' element={<CreateProject />} />
                    <Route path="/projects/editProject"  element={<EditProject />} />

                </Routes>
            </div>
        </Router>
    );
};

export default Routing;
