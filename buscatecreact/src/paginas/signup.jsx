import react, { useState } from 'react';
import './signup.css';

const interestPool = [
    'Sports',
    'Music',
    'Technology',
    'Food',
    'Gaming',
    'Books',
    'Fitness',
];

const careerPool = [
    'ITC',
    'LAF',
    'IMT',
    'LIN',
    'LAD',
    'LDI',
];

export function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleInterestChange = (e) => {
        const { options } = e.target;
        const selectedInterests = Array.from(options)
          .filter((option) => option.selected)
          .map((option) => option.value);
        setFormData({ ...formData, interests: selectedInterests });
      };

      const handleCareerChange = (e) => {
        const { options } = e.target;
        const selectedCareer = Array.from(options)
          .filter((option) => option.selected)
          .map((option) => option.value);
        setFormData({ ...formData, career: selectedCareer });
      };
    
    
      const handleOnSubmit = async (evt) => {
        evt.preventDefault();
    
        const { firstName, lastName, email, password } = formData;
        alert(`You are creating a user with the email: ${email}`);
    
        try {
          const response = await fetch('/api/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              first_name: firstName,
              last_name: lastName,
              email,
              password,
            }),
          });
          
          if(response.status === 201) {
            alert('Registration succesful!');
          } else {
            alert('Registration failed.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error has occurred during registration, please try at a later date');
        }
        
       setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
       });
      };

      return (
        <div className="form-container sign-up-container">
           <h1 style={{paddingTop: '1em'}}>Create Account</h1>
        
          <form style={{marginTop: '-100px'}} onSubmit={handleOnSubmit}>
            {/* First Name */}
            <input className='input'
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            {/* Last Name */}
            <input className='input'
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            {/* Email */}
            <input className='input'
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {/* Password */}
            <input className='input'
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {/* Submit Button */}
            <button style={{borderRadius: "20px"}}>Register</button>
          </form>
        </div>
      );
    }
    
    export default Signup;