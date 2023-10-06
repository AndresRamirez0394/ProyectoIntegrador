import React from "react";
import {useForm} from "react-hook-form"
import { emailValidate, passwordValidate } from "utils/form-validate";
import {useLogin} from "../hooks/auth"
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const { login, isLoading } = useLogin();
  const {register, handleSubmit, reset} = useForm();
  const navigate = useNavigate();

  async function handleSignIn(data){
    const succeeded = await login({
      email: data.email,
      password: data.password,
    });

    if (succeeded) {
      reset();
      navigate('/App')
    }
  }

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit(handleSignIn)}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i class="fa fa-google-plus" aria-hidden="true"></i>
          </a>
        </div>
        <span>or use your account</span>
        <input className='input'
          type="email"
          placeholder="Email" {...register('email', emailValidate)}/>
        <input className='input'
          type="password"
          placeholder="Password" {...register('password', passwordValidate)}
        />
        <a href="#">Forgot your password?</a>
        <button style={{borderRadius: "20px"}} >Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
