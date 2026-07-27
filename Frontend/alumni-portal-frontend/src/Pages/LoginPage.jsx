import { useState } from "react";
import axios from "axios";
import { useNavigate }
from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/LoginPage.css";
function LoginPage() {
    
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response =
                await axios.post(
                    "http://localhost:8080/auth/login",
                    loginData
                );

                if (
                    response.data === "User Not Found" ||
                    response.data === "Invalid Password" ||
                    response.data === "Account Deactivated"
                ) {
                    alert(response.data);
                    return;
                }
                
                localStorage.setItem(
                    "token",
                    response.data
                );
                
                navigate("/dashboard");

        } catch(error) {
            console.log(error);
    console.log(error.response);
    alert(
        error.response?.data ||
        "Invalid Credentials"
    );
        }
    };

    return (
        <div className="auth-wrapper">

        <div className="auth-card">

            <div className="logo">
                🎓
            </div>

            <h2 className="title">
                Alumni Mentorship Portal
            </h2>

            <p className="subtitle">
                Connect • Learn • Grow
            </p>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                </div>

                <button
    className="auth-btn"
    type="submit"
>
    Login
</button>

                <p className="auth-link">
    Don't have an account?
    <Link to="/register"> Register</Link>
</p>

            </form>

        </div>

    </div>
);
}

export default LoginPage;