import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useForm} from "react-hook-form"

function SignInForm() {
  const { login, isLoading } = useLogin();
  const {register} = useForm();


  return (
    <div className="form-container sign-in-container">
      <form onSubmit={() => {}}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i class="fa fa-google-plus" aria-hidden="true"></i>
          </a>
        </div>
        <span>or use your account</span>
        <input className='input'
          type="email"
          placeholder="Email" {...register('email')}/>
        <input className='input'
          type="password"
          placeholder="Password" {...register('password')}
        />
        <a href="#">Forgot your password?</a>
        <button style={{borderRadius: "20px"}} >Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
