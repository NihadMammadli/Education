import Layout from "../Layouts";
import React, { Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { HighSchools, Schools, Universities, Login } from '../Pages';


const Index = () => {
    return (
        <BrowserRouter>
            <Suspense>
                <Routes>
                    <Route path="/">
                        <Route path='login' element={<Login />} />
                        <Route path="/education" element={<Layout />}>
                            <Route path='schools' element={<Schools />} />
                            <Route path='high_schools' element={<HighSchools />} />
                            <Route path='universities' element={<Universities />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default Index;
