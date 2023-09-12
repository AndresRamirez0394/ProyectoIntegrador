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

    const handleInputChange = (e) => {
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
    
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Signup Data:', formData);
      };

      return (
        <div className="signup-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="interests">Main Interests:</label>
              <select
                id="interests"
                name="interests"
                multiple
                value={formData.interests}
                onChange={handleInterestChange}
              >
                {interestPool.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="carreers">Career:</label>
              <select
                id="carreer"
                name="carreer"
                multiple
                value={formData.career}
                onChange={handleCareerChange}
              >
                {careerPool.map((career) => (
                  <option key={career} value={career}>
                    {career}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      );
    }

    export default Signup;