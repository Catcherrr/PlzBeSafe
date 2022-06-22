import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './About/About';
import Login from './Login/Login';
import Main from './Main/Main';
import Modifyregister from './Modifyregister/Modifyregister';
import Signup from './Signup/Signup';
import Mypage from './Mypage/Mypage';
import Resetpassword from './Resetpassword/Resetpassword';
import Inquiry from './Inquiry/Inquiry';
import Howtouse from './Howtouse/Howtouse';
const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/howtouse" element={<Howtouse />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/modifyregister" element={<Modifyregister />} />
            <Route path="/resetpassword" element={<Resetpassword />} />
        </Routes>
    );
};

export default RoutesComponent;
