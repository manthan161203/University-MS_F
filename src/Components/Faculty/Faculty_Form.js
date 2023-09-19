import React, { useState , useEffect } from 'react';
import '../form.css';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

function Faculty_Form() {
    const role = localStorage.getItem("role");
    const [data, setData] = useState();
    const [status, setStatus] = useState();
    const [error, setError] = useState();
  
    const schema = yup.object().shape({
        faculty_id: yup.string().required("ID is required").min(5),
        faculty_name: yup.string().required("Name is required").min(5),
        faculty_email: yup.string().email().required("Email is required"),
        faculty_mobile_number: yup.string().transform(
        (value) => (isNaN(value) ? undefined : value)
      ).required("Mobile Number is required").min(10).max(10),
      faculty_experience: yup.number().required("Experience is required").positive().integer(),
      faculty_qualification: yup.string().required("Qualification is required"),
      faculty_designation: yup.string().required("Designation is required"),
      faculty_department: yup.string().required("Department is required"),
    });
  
    const { register, handleSubmit, formState: { errors } , reset } = useForm(
      {
        resolver: yupResolver(schema),
      }
    );
    
    const onSubmit = (data) => {
      console.log(data);
      setData(data);
      setTimeout(() => {
          setData(null);
      }, 2000);
      reset();
  }
  
    const createFaculty = async() => {
      await axios.post(`http://localhost:3001/${role}/addFacultyDetails`, data).then((data) => {
        console.log("success");
        console.log(data?.data?.message?._message);
        console.log(data?.data);
  
        if(data?.data?.message?.errors !== undefined)
        {
          setError(data?.data?.message?._message);
        }
        else
        {
          setStatus(data?.data?.message);
              setTimeout(() => {
                  setStatus("");
              }, 2000);
        }
      }, 
      (error) => {
        if (error.message === "Request failed with status code 404")
        {
          alert("You are not allowed to add Faculty Details");
        }
        else
        {
          console.log(JSON.stringify(error));
        }
      }
      );
    }
  
  
    useEffect(() => {
      if(data !== undefined && data !== null)
      {
        createFaculty();
      }
    }, [data]);
  
    useEffect(() => {
        setStatus("");
    }, [error]);
  
  
  return (
    <div className="col-xxl">
      <div className="card mb-4">
          <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">FacultyDetails Form</h5>
              <small className="text-muted float-end">Default label</small>
          </div>
          <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} method="POST">
                  <div className="row mb-3">
                      <label className="col-sm-5 col-form-label" htmlFor="faculty_id">Faculty ID:</label>
                      <div className="col-sm-10">
                              <input type="text" className="form-control" id="faculty_id" name="faculty_id" required {...register("faculty_id")}/>
                              <p className="text-danger">{errors?.faculty_id?.message}</p>
                      </div>
                  </div>
                  <div className="row mb-3">
                      <label className="col-sm-5 col-form-label" htmlFor="faculty_name">Faculty Name:</label>
                      <div className="col-sm-10">
                              <input type="text" className="form-control" id="faculty_name" name="faculty_name" required {...register("faculty_name")}/>
                                <p className="text-danger">{errors?.faculty_name?.message}</p>
                      </div>
                  </div>
                  <div className="row mb-3">
                      <label className="col-sm-5 col-form-label" htmlFor="faculty_email">Faculty Email:</label>
                      <div className="col-sm-10">
                              <input type="email" className="form-control" id="faculty_email" name="faculty_email" required {...register("faculty_email")}/>
                                <p className="text-danger">{errors?.faculty_email?.message}</p>
                      </div>
                  </div>
                  <div className="row mb-3">
                      <label className="col-sm-5 col-form-label" htmlFor="faculty_mobile_number">Faculty Mobile Number:</label>
                      <div className="col-sm-10">
                              <input type="tel" className="form-control phone-mask" id="faculty_mobile_number" name="faculty_mobile_number" required {...register("faculty_mobile_number")}/>
                                <p className="text-danger">{errors?.faculty_mobile_number?.message}</p>
                      </div>
                  </div>
                  <div className="row mb-3">
                      <label className="col-sm-5 col-form-label" htmlFor="faculty_experience">Faculty Experience:</label>
                      <div className="col-sm-10">
                              <input type="text" className="form-control" id="faculty_experience" name="faculty_experience" required {...register("faculty_experience")}/>
                                <p className="text-danger">{errors?.faculty_experience?.message}</p>
                      </div>
                  </div>
                  <div className="row mb-3">
                      <label className="col-sm-5 col-form-label" htmlFor="faculty_qualification">Faculty Qualification:</label>
                      <div className="col-sm-10">
                              <input type="text" className="form-control" id="faculty_qualification" name="faculty_qualification" required {...register("faculty_qualification")}/>
                                <p className="text-danger">{errors?.faculty_qualification?.message}</p>
                      </div>
                  </div>
                  <div className="row mb-3">
                      <label className="col-sm-5 col-form-label" htmlFor="faculty_designation">Faculty Designation:</label>
                      <div className="col-sm-10">
                              <input type="text" className="form-control" id="faculty_designation" name="faculty_designation" required {...register("faculty_designation")}/>
                                <p className="text-danger">{errors?.faculty_designation?.message}</p>
                      </div>
                  </div>
                  <div className="row mb-3">
                      <label className="col-sm-5 col-form-label" htmlFor="faculty_department">Faculty Department:</label>
                      <div className="col-sm-10">
                              <input type="text" className="form-control" id="faculty_department" name="faculty_department" required {...register("faculty_department")}/>
                                <p className="text-danger">{errors?.faculty_department?.message}</p>
                      </div>
                  </div>
                  <div className="row justify-content-end">
                      <div className="col-sm-10">
                          <button type="submit" className="btn btn-primary">Submit</button>
                      </div>
                      </div>
                      {status !== undefined && <p>{status}</p>}
                        {error !== undefined && <p className="text-danger">{error}</p>}
              </form>
          </div>
      </div>
  </div>

  )
}

export default Faculty_Form
