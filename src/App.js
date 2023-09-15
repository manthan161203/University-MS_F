import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TTO_Form from './Components/TTO/TTO_Form';
import CourseDetails_Form from './Components/Student/CourseDetails_Form';
import HOD_Form from './Components/HOD/HOD_Form';
import Faculty_Form from './Components/Faculty/Faculty_Form';
import TPO_Form from './Components/TPO/TPO_Form';
import Student_Form from './Components/Student/Student_Form';
import Login from './Components/Login/Login';
import { NavbarNested } from './Components/NavbarNested';

function App() {
  return (
    <div className="App justify-between flex">
      <Router>
        <div className='inline'>
          <NavbarNested/>
        </div>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/create-tto" element={<TTO_Form/>} />
          <Route path="/create-courseDetails" element={<CourseDetails_Form/>} />
          <Route path="/create-hod" element={<HOD_Form/>} />
          <Route path="/create-faculty" element={<Faculty_Form/>} />
          <Route path="/create-tpo" element={<TPO_Form/>} />
          <Route path="/create-student" element={<Student_Form/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
