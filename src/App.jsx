/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Details from "./Details";

function App() {
  return (
    <BrowserRouter>
      <div className='container bg-amber-50 w-full min-h-dvh'>
        <nav className='w-full bg-slate-500 p-2 flex items-center justify-start'>
          <NavLink to='/' className='font-medium text-xl text-white'>WareFind</NavLink>
        </nav>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/details/:id' element={<Details></Details>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
