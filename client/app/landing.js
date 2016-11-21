import React from 'react';
import { Link } from 'react-router';

const Landing = () => (
  <div className="app-container">
    <div className="home-info">
      <h1>DIY Projects</h1>
        <input className="search" type="text" placeholder="Enter Search" />
        <Link to='/search' className="browse-all">or Browse All</Link> 
       
    </div>
  </div>
);

// <button className="browse-all">or Browse All</button> 
// <Link> </Link>
export default Landing;