import { useState } from "react";
import { registerUser } from "../services/authService";
import "../styles/Auth.css";

function RegisterPage() {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "STUDENT"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
    
        try {
    
            const response =
                await registerUser(formData);
    
            alert(response.data);
    
        } catch (error) {
    
            console.log(error);
    
        }
    };
    
        

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">

    <div className="card shadow p-4" style={{width:"450px"}}>

      <h2 className="text-center mb-4">
        Alumni Mentorship Portal
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <select
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="STUDENT">Student</option>
<option value="ALUMNI">Alumni</option>
<option value="MENTOR">Mentor</option>
<option value="ADMIN">Admin</option>
          </select>
        </div>

        <button
          className="btn btn-primary w-100"
          type="submit"
        >
          Register
        </button>
        
        <p className="text-center mt-3">
  Already have an account?
  <a href="/"> Login</a>
</p>
      </form>

    </div>

  </div>
    );
}

export default RegisterPage;