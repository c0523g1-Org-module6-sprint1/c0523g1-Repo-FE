
import React from 'react';
import {PersonalPage} from "./components/PersonalPage/PersonalPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TestNoUse} from "./components/PersonalPage/TestNoUse";


function App(props) {
    return (
        <>
               <Routes>
                   <Route element={<TestNoUse/>} path={"/"}></Route>
                   <Route element={<PersonalPage/>} path={"/personal-page/:id"}></Route>
               </Routes>

        </>
    );
}

export default App;