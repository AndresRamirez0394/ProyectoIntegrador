import react, { useState } from 'react';
import './signup.css';
import { useRegister } from 'hooks/auth';
import { useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import { toast } from 'react-toastify';
import { emailValidate, passwordValidate } from 'utils/form-validate';

export default function Signupform() {
  const { register: signup, isLoading } = useRegister();
  const {register, handleSubmit, formState : {errors}} = useForm();
  const navigate = useNavigate();


  async function handleRegister(data){
    const succeeded = await signup({
      matricula: data.matricula,
      email: data.email,
      password: data.password,
      name: data.nombre,
    });
    if (succeeded) {
      toast('You are now logged in', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "dark",
        pauseOnHover: true,
    });
      navigate('/login')
    }

  }

      return (
        <div className="form-container sign-up-container">
           <h1 style={{paddingTop: '1em', paddingLeft: '4em'}} >Create Account</h1>
        
          <form style={{marginTop: '-100px'}} onSubmit={handleSubmit(handleRegister)}>
            {/* Nombre */}
            <input className='input'
              type="nombre"
              placeholder="Nombre" {...register("nombre")}
            />
            {/* Matricula */}
            <input className='input'
              type="matricula"
              placeholder="Matricula" {...register("matricula")}
            />
            {/* Email */}
            <input className='input'
              type="email"
              name="email"
              placeholder="Email" {...register("email", emailValidate)}
            />
            {/* Password */}
            <input className='input'
              type="password"
              name="password"
              placeholder="Password" {...register("password", passwordValidate)}
            />
            {/* Submit Button */}
            <button style={{borderRadius: "20px"}}>Register</button>
          </form>
        </div>
      );
    }
    