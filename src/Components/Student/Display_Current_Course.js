import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Profile from '../Profile';

function Display_Current_Course() {
  // const role = localStorage.getItem("role");
  const role = "student";
  // const id = localStorage.getItem("id");
  const id = "123456789";
  const [data, setData] = useState();
  


  const getData = () => {
    axios.get(`http://localhost:3001/${role}/getCourseForCurrentSemester/${id}`).then((data) => {
      console.log(data?.data);
      setData(data?.data);
    });
  }

  useEffect(() => {
    getData();
  },[])
  return (
    <>
      <div>Display_Course</div>
      <div>
              {
                  data !== undefined && data != null && <Profile data={data?.courseDetails[0]}/>
              }
      </div>
    </>
  )
}

export default Display_Current_Course;