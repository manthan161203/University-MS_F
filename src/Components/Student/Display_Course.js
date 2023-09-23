import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Profile from '../Profile';

function Display_Course() {

  const {id} = useParams();
  // const role = localStorage.getItem("role");
  const role = "admin";
  const [data, setData] = useState();

  const getData = () => {
    axios.get(`http://localhost:3001/${role}/getCourseDetails/${id}`).then((data) => {
      console.log(data?.data);
      setData(data?.data);
    }).catch((error) => {
      console.log(error);
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
                  data !== undefined && data != null && <Profile data={data[0]}/>
              }
      </div>
    </>
  )
}

export default Display_Course