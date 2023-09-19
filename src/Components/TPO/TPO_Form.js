import React, { useState , useEffect } from 'react'
import '../form.css';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

function TPO_Form() {
    const role = localStorage.getItem("role");
    const [data, setData] = useState({});
    const [status, setStatus] = useState("");
    const [error, setError] = useState();
  
    const schema = yup.object().shape({
        tpo_id: yup.string().required("ID is required").min(5),
        tpo_name: yup.string().required("Name is required").min(5),
        tpo_email: yup.string().email().required("Email is required"),
        tpo_mobile_number: yup.string().transform(
        (value) => (isNaN(value) ? undefined : value)
      ).required("Mobile Number is required").min(10).max(10),
      tpo_experience: yup.number().required("Experience is required").positive().integer(),
      tpo_qualification: yup.string().required("Qualification is required"),
      tpo_designation: yup.string().required("Designation is required"),
      tpo_department: yup.string().required("Department is required"),
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
  
    const createTPO = async() => {
     await axios.post(`http://localhost:3001/${role}/createTPO`, data).then((data) => {
        console.log("success");
        console.log(data?.data?.message?.errors);
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
          createTPO();
        }
      }, [data]);

    useEffect(() => {
        setStatus("");
    }, [error]);

  return (
    <div className="col-xxl">
        <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
            <h5 className="mb-0">TPODetails Form</h5>
            <small className="text-muted float-end">Default label</small>
            </div>
            <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
                <div className="row mb-3">
                <label className="col-sm-5 col-form-label" htmlFor="tpo_id">TPO ID:</label>
                <div className="col-sm-10">
                              <input type="text" className="form-control" id="tpo_id" name="tpo_id" required {...register("tpo_id")} />
                              <p className='text-danger'>{errors?.tpo_id?.message}</p>
                </div>
                </div>
                <div className="row mb-3">
                <label className="col-sm-5 col-form-label" htmlFor="tpo_name">TPO Name:</label>
                <div className="col-sm-10">
                              <input type="text" className="form-control" id="tpo_name" name="tpo_name" required {...register("tpo_name")} />
                              <p className="text-danger">{errors?.tpo_name?.message}</p>
                </div>
                </div>
                <div className="row mb-3">
                <label className="col-sm-5 col-form-label" htmlFor="tpo_email">TPO Email:</label>
                <div className="col-sm-10">
                              <input type="email" className="form-control" id="tpo_email" name="tpo_email" required {...register("tpo_email")} />
                                <p className="text-danger">{errors?.tpo_email?.message}</p>
                </div>
                </div>
                <div className="row mb-3">
                <label className="col-sm-5 col-form-label" htmlFor="tpo_mobile_number">TPO Mobile Number:</label>
                <div className="col-sm-10">
                              <input type="tel" className="form-control phone-mask" id="tpo_mobile_number" name="tpo_mobile_number" required {...register("tpo_mobile_number")} />
                                <p className="text-danger">{errors?.tpo_mobile_number?.message}</p>
                </div>
                </div>
                <div className="row mb-3">
                <label className="col-sm-5 col-form-label" htmlFor="tpo_experience">TPO Experience:</label>
                <div className="col-sm-10">
                              <input type="number" className="form-control" id="tpo_experience" name="tpo_experience" required {...register("tpo_experience")} />
                                <p className="text-danger">{errors?.tpo_experience?.message}</p>
                </div>
                </div>
                <div className="row mb-3">
                <label className="col-sm-5 col-form-label" htmlFor="tpo_qualification">TPO Qualification:</label>
                <div className="col-sm-10">
                              <input type="text" className="form-control" id="tpo_qualification" name="tpo_qualification" required {...register("tpo_qualification")} />
                                <p className="text-danger">{errors?.tpo_qualification?.message}</p>
                </div>
                </div>
                <div className="row mb-3">
                <label className="col-sm-5 col-form-label" htmlFor="tpo_designation">TPO Designation:</label>
                <div className="col-sm-10">
                              <input type="text" className="form-control" id="tpo_designation" name="tpo_designation" required {...register("tpo_designation")} />
                                <p className="text-danger">{errors?.tpo_designation?.message}</p>
                </div>
                </div>
                <div className="row mb-3">
                <label className="col-sm-5 col-form-label" htmlFor="tpo_department">TPO Department:</label>
                <div className="col-sm-10">
                              <input type="text" className="form-control" id="tpo_department" name="tpo_department" required {...register("tpo_department")} />
                                <p className="text-danger">{errors?.tpo_department?.message}</p>
                </div>
                </div>
                <div className="row justify-content-end">
                <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                </div>
                {status !== "" && <p>{status}</p>}
                {error !== undefined && <p className="text-danger">{error}</p>}
            </form>
            </div>
        </div>
    </div>

  )
}

export default TPO_Form
