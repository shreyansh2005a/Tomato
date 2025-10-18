import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import RegisterChoice from '../pages/RegisterChoice';
import Home from '../pages/general/Home'
import CreateFoodPartner from '../pages/foodPartner/CreateFoodPartner'
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegisterChoice/>} />
                <Route path="/user/register" element={<UserRegister/>} />
                <Route path="/user/login" element={<UserLogin/>} />
                <Route path="/foodpartner/register" element={<FoodPartnerRegister/>} />
                <Route path="/foodpartner/login" element={<FoodPartnerLogin/>} />
                <Route path="/Home" element={<Home/>} />
                 <Route path="/CreateFoodPartner" element={<CreateFoodPartner/>} />
                
            </Routes>
        </Router>
    );
};

export default AppRoutes;
