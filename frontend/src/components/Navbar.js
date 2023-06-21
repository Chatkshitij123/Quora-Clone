import React, { useState } from 'react'
import HomeIcon from '@material-ui/icons/Home'
import  FeaturedPlayListOutlinedIcon  from '@material-ui/icons/FeaturedPlayListOutlined';
import AssignmentTurnedInOutlinedIcon  from '@material-ui/icons/AssignmentTurnedInOutlined';
import  PeopleAltOutlinedIcon  from '@material-ui/icons/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import SearchIcon from '@material-ui/icons/Search';
import LanguageIcon from '@material-ui/icons/Language';

import { Avatar, Button, Input } from '@material-ui/core';
import '../css/Navbar.css';
import Modal from 'react-responsive-modal';
import {ExpandMore } from '@material-ui/icons';
import CloseIcon from "@material-ui/icons/Close";
import "react-responsive-modal/styles.css"
import axios from 'axios';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
function Navbar() {
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");

  const Close = <CloseIcon/>;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleSubmit = async() => {
   if(question !==""){
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const body ={
      questionName : question,
      questionUrl : inputUrl,
      user: user,
    }
   
   await axios.post("/api/questions",body, config).then((res)=> {
    console.log(res.data);
    alert(res.data.message);
    window.location.href="/";
   }).catch((e)=> {
     console.log(e);
     alert("Error in adding question")
   });
  }
};
const handleLogout = () => {
  if (window.confirm("Are you sure to logout ?")) {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        console.log("Logged out");
      })
      .catch(() => {
        console.log("error in logout");
      });
  }
};
  return (
    <div className='qHeader'>
      <div className="qHeader_logo">
        <img
        src="https://tse2.mm.bing.net/th?id=OIP.99cDmooBxz-UqOysd0nMmQHaE8&pid=Api&P=0&h=180"
        alt=""
        />
      </div>
      <div className="qHeader_icons">
        <div className="qHeader_icon">
        <HomeIcon/>
        </div>
        <div className="qHeader_icon">
          <FeaturedPlayListOutlinedIcon/>
        </div>
        <div className="qHeader_icon">
          <AssignmentTurnedInOutlinedIcon/>
        </div>
        <div className="qHeader_icon">
          <PeopleAltOutlinedIcon/>
        </div>
        <div className="qHeader_icon">
          <NotificationsOutlinedIcon/>
        </div>
      </div>
      <div className="qHeader_search">
        <SearchIcon/>
        <input type = "text" placeholder="Search Quora"/>
      </div>
      <div className="qHeader_Rem">
        <div className="qHeader_avatar">
        <span onClick={handleLogout}>
            <Avatar src={user?.photo} />
            </span>
        </div>
        <LanguageIcon/>
        <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
        <Modal
        open = {isModalOpen}
        closeIcon = {Close}
        onClose={() => setIsModalOpen(false)}
        closeOnEsc
        center
        closeOnOverlayClick={false}
        styles={{
          overlay:{
            height:"auto",
          },
        }}
        >
          <div className="modal_title">
            <h5>Add Question</h5>
            <h5>Share Link</h5>
          </div>
          <div className="modal_info">
            <Avatar src={user?.photo} className='avatar'/>
            <div className="modal_scope">
              <PeopleAltOutlinedIcon/>
              <p>Public</p>
              <ExpandMore/>
            </div>
          </div>
          <div className="modal_Field">
            <Input
            value={question}
            onChange = {(e)=> setQuestion(e.target.value)}
             type="text" placeholder="Start your question with 'What', 'How', 'Why', etc."/>
            <div style={{
              display: "flex",
              flexDirection: "column",
            }}>
              <input type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              style={{
                margin: "5px 0",
                border: "1px solid lightgray",
                padding: "10px",
                outline: "2px solid #000",
              }}
              placeholder="Optional: include a link that gives context" />
              {
                inputUrl !== "" && <img style={{
                  height: "40vh",
                  objectFit: "contain",
                }}src={inputUrl} alt="displayimage"/>
              }
              
            </div>
          </div>
          <div className="modal_buttons">
            <button className="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
            </button>
            <button onClick={handleSubmit} type="submit" className="add">
            Add Question
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Navbar
