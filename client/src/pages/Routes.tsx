import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './About/About';
import Login from './Login/Login';
import Main from './Main/Main';
import Modifyregister from './Modifyregister/Modifyregister';
import Signup from './Signup/Signup';
import Mypage from './Mypage/Mypage';
import Inquiry from './Inquiry/Inquiry';
import Howtouse from './Howtouse/Howtouse';
import SignupOk from './Signup/SignupOk';
import Changepassword from './Changepassword/Changepassword';
import ChangepasswordOk from './Changepassword/ChangepasswordOk';
import ModifyregisterOk from './Modifyregister/ModifyregisterOk';

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/howtouse" element={<Howtouse />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signupok" element={<SignupOk />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/modifyregister" element={<Modifyregister />} />
            <Route path="/modifyregisterok" element={<ModifyregisterOk />} />
            <Route path="/changepassword" element={<Changepassword />} />
            <Route path="/changepasswordok" element={<ChangepasswordOk />} />
        </Routes>
    );
};

export default RoutesComponent;
