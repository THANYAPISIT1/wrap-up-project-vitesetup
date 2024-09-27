import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validateUsername ,validatePassword } from "../validator/userValidator";

const API_URL = import.meta.env.VITE_API_URL;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "", // Used only for registration
  });
  const [errors, setErrors] = useState({}); // Error state to track validation messages
  const [successMessage, setSuccessMessage] = useState(""); // Track success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validate Email
    const emailValidation = validateEmail(formData.email);
    if (emailValidation !== true) validationErrors.email = emailValidation;

    // Validate Username
    const usernameValidation = validateUsername(formData.username);
    if (usernameValidation !== true) validationErrors.username = usernameValidation;

    // Validate Password
    const passwordValidation = validatePassword(formData.password);
    if (passwordValidation !== true) validationErrors.password = passwordValidation;

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    // Check if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage(""); // Clear success message on validation error
      return;
    }

    // If no validation errors, proceed with API call
    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      setSuccessMessage(response.data.message);

      if (response.status === 200) {
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after successful registration
        }, 2000);
      }
    } catch (error) {
      setErrors({
        apiError: error.response?.data?.message || "An error occurred. Please try again.",
      });
    }
  };


  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 my-2"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          {errors.username && <p className="text-red-500">{errors.username}</p>}
          <div className="my-2">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 my-2"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <div className="my-2">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 my-2"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <div className="my-2">
            <label htmlFor="confirmPassword" className="block text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 my-2"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
          <button
            type="submit"
            className="bg-[#008000] hover:bg-[#00C000] text-white font-semibold rounded-md py-2 px-4 mt-4 w-full"
          >
            Register
          </button>
          {errors.apiError && <p className="text-red-500 mt-2">{errors.apiError}</p>}
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        </form>

        <div className="mt-4 text-blue-500 my-2 text-center">
          <Link to={'/login'}>
            <button className="hover:underline">Sign In</button>
          </Link>
        </div>
      </div>
      <div className="w-1/2 h-screen hidden lg:block">
        <img 
          src="https://images-ext-1.discordapp.net/external/4nQ6xSowB3x4KQCiIEO6xDqeBxVp8HKTlr7gmpFCiig/https/static.wixstatic.com/media/e6f56d_a2b47380e8504300bfb2844e4a8a5159~mv2.gif" 
          alt="gif" 
          className="object-fill w-full h-screen"  
        />
      </div>
    </div>
  );
};

export default RegisterPage;