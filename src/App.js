import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignIn from './pages/Signin';
import Membership from './pages/Membership';
import Userprofile  from './pages/Userprofile';
import SportxHome from './pages/SportxHome';
import Idcard  from './pages/Idcard'; 
import Renewal from './pages/Renewal';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './pages/PrivateRoute';
import AdminRoute from './pages/AdminRoute';
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/membership" element={<PrivateRoute><Membership /></PrivateRoute>} />
        <Route path="/userprofile" element={<PrivateRoute><Userprofile /></PrivateRoute>} />
        <Route path="/Home" element={<PrivateRoute><SportxHome/></PrivateRoute>} />
        <Route path="/idcard" element={<PrivateRoute><Idcard/></PrivateRoute>} />
        <Route path="/renewal" element={<PrivateRoute><Renewal/></PrivateRoute>} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path='/admindash' element={<AdminDashboard/>} />
      </Routes>
    </>
  );
}

export default App;
