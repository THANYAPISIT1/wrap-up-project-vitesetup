import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./custom-style.module.css";
import AnimatedInput from "./AnimatedInput ";
import { validateEmail, validateUsername, validatePassword } from "../pages/validator/userValidator"; // Assuming this is available

const API_URL = import.meta.env.VITE_API_URL;

const TestPage = () => {  
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "", remember: false });
  const [registerData, setRegisterData] = useState({ email: "", username: "", password: "", confirmPassword: "" });
  const [loginMessage, setLoginMessage] = useState("");
  const [registerErrors, setRegisterErrors] = useState({});
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignUpMode) {
      navigate("/register");
      setLoginData({username: "", password: "", remember: false })
    } else {
      navigate("/login");
      setRegisterData({ email: "", username: "", password: "", confirmPassword: "" })
    }
  }, [isSignUpMode, navigate]);

  // Handle Login Change
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({ ...loginData, [name]: type === "checkbox" ? checked : value });
  };

  // Handle Register Change
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  // Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        username: loginData.username,
        password: loginData.password,
        rememberMe: loginData.remember,
      }, { withCredentials: true });

      setLoginMessage(response.data.message);
      if (response.status === 200) {
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (error) {
      setLoginMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  // Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    const emailValidation = validateEmail(registerData.email);
    if (emailValidation !== true) validationErrors.email = emailValidation;

    const usernameValidation = validateUsername(registerData.username);
    if (usernameValidation !== true) validationErrors.username = usernameValidation;

    const passwordValidation = validatePassword(registerData.password);
    if (passwordValidation !== true) validationErrors.password = passwordValidation;

    if (registerData.password !== registerData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setRegisterErrors(validationErrors);
      setRegisterSuccessMessage("");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        email: registerData.email,
        username: registerData.username,
        password: registerData.password,
      });

      setRegisterSuccessMessage(response.data.message);
      if (response.status === 200) {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setRegisterErrors({
        apiError: error.response?.data?.message || "An error occurred. Please try again."
      });
    }
  };

  return (
    <div className={`${styles.container} ${isSignUpMode ? styles["sign-up-mode"] : ""}`}>
      <div className={styles["forms-container"]}>
        <div className={styles["signin-signup"]}>
          {/* Sign In Form */}
          <form className={styles["sign-in-form"]} onSubmit={handleLoginSubmit}>
            <h2 className={styles.title}>Sign in</h2>
            <AnimatedInput label="Username" name="username" value={loginData.username} onChange={handleLoginChange} className="my-2" />
            <AnimatedInput label="Password" name="password" type="password" value={loginData.password} onChange={handleLoginChange} className="my-2" />
            <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} />
            {loginMessage && <p className="mt-4 text-center text-red-500">{loginMessage}</p>}
            <p className={styles["social-text"]}>Or Sign in with social platforms</p>
            <div className={styles["social-media"]}>
              <a href="#" className={styles["social-icon"]}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles["social-icon"]}><i className="fab fa-twitter"></i></a>
              <a href="#" className={styles["social-icon"]}><i className="fab fa-google"></i></a>
              <a href="#" className={styles["social-icon"]}><i className="fab fa-linkedin-in"></i></a>
            </div>
          </form>

          {/* Sign Up Form */}
          <form className={styles["sign-up-form"]} onSubmit={handleRegisterSubmit}>
            <h2 className={styles.title}>Sign up</h2>
            <AnimatedInput label="Username" name="username" value={registerData.username} onChange={handleRegisterChange} />
            {registerErrors.username && <p className="text-red-500">{registerErrors.username}</p>}
            <AnimatedInput label="Email" name="email" value={registerData.email} onChange={handleRegisterChange} />
            {registerErrors.email && <p className="text-red-500">{registerErrors.email}</p>}
            <AnimatedInput label="Password" name="password" type="password" value={registerData.password} onChange={handleRegisterChange} />
            {registerErrors.password && <p className="text-red-500">{registerErrors.password}</p>}
            <AnimatedInput label="Confirm Password" name="confirmPassword" type="password" value={registerData.confirmPassword} onChange={handleRegisterChange} />
            {registerErrors.confirmPassword && <p className="text-red-500">{registerErrors.confirmPassword}</p>}
            <input type="submit" value="Sign up" className={styles.btn} />
            {registerErrors.apiError && <p className="text-red-500 mt-2">{registerErrors.apiError}</p>}
            {registerSuccessMessage && <p className="text-green-500 mt-2">{registerSuccessMessage}</p>}
            <p className={styles["social-text"]}>Or Sign up with social platforms</p>
            <div className={styles["social-media"]}>
              <a href="#" className={styles["social-icon"]}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles["social-icon"]}><i className="fab fa-twitter"></i></a>
              <a href="#" className={styles["social-icon"]}><i className="fab fa-google"></i></a>
              <a href="#" className={styles["social-icon"]}><i className="fab fa-linkedin-in"></i></a>
            </div>
          </form>
        </div>
      </div>

      <div className={styles["panels-container"]}>
        <div className={`${styles.panel} ${styles["left-panel"]}`}>
          <div className={styles.content}>
            <h3>New here?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button className={`${styles.btn} ${styles.transparent}`} onClick={() => setIsSignUpMode(true)}>Sign up</button>
          </div>
          <img src="https://raw.githubusercontent.com/sefyudem/Sliding-Sign-In-Sign-Up-Form/refs/heads/master/img/log.svg" className={styles.image} alt="" />
        </div>
        <div className={`${styles.panel} ${styles["right-panel"]}`}>
          <div className={styles.content}>
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button className={`${styles.btn} ${styles.transparent}`} onClick={() => setIsSignUpMode(false)}>Sign in</button>
          </div>
          <img src="https://raw.githubusercontent.com/sefyudem/Sliding-Sign-In-Sign-Up-Form/refs/heads/master/img/register.svg" className={styles.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
