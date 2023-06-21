import React from 'react';
import '../css/Quora.css';
import Navbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import Feed from './Feed';
import Widget from './Widget.js';
function Quora() {
  return (
    <div>
      
      <Navbar/>
      <div className="quora_content">
        <Sidebar/>
        <Feed/>
        <Widget/>
      </div>
    </div>

  )
}

export default Quora
