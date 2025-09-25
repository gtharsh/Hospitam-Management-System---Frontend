import React, { useState, useEffect } from 'react';
import Patients from './components/Patients';
import Doctors from './components/Doctors';
import Appointments from './components/Appointments';
import Pharmacy from './components/Pharmacy';
// import './App.css';

export default function App(){
  return (
    <div className="container">
      <h1>Hospital Management</h1>
      <div className="row">
        <div className="col">
          <Patients />
        </div>
        <div className="col">
          <Doctors />
          <Appointments />
        </div>
        <div className="col">
          <Pharmacy />
        </div>
      </div>
    </div>
  );
}
