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
        interests: [],
        career: [],
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
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch('/api/signup/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            });

            if(response.ok) {
              console.print("SUCCESS!")
            } else {
              console.error('Registration failed');
            }
        } catch (error) {
          console.error('ERROR:', error);
        }
      };

      return (
        <div className="form-container sign-up-container">
           <h1 style={{paddingTop: '1em'}}>Create Account</h1>
        
          <form style={{marginTop: '-100px'}} onSubmit={handleSubmit}>
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