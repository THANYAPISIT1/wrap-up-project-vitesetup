// import  { useState } from 'react';
import { Link } from "react-router-dom";


const RegisterPage = () => {
  return(
    <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
          <form action="#" method="POST">
              <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-600">Username</label>
                  <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
              </div>
              <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-600">Email</label>
                  <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
              </div>
              <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-600">Password</label>
                  <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
              </div>
              <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-600">Confirm Password</label>
                  <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
              </div>

              <button type="submit" className="bg-[#008000] hover:bg-[#00C000] text-white font-semibold rounded-md py-2 px-4 mt-4 w-full">Create User</button>
          </form>
          <div className="mt-6 text-blue-500 text-center">
              <Link to={'/register'}>
                  <button className="hover:underline">Sign In</button>
              </Link>
          </div>
        </div>
        <div className="w-1/2 h-screen hidden lg:block">
            <img src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image" className="object-cover w-full h-full"/>
        </div>

    </div>
);
};
  //   const [isRegistering, setIsRegistering] = useState(false);

  //   return (
  //     <div className="bg-gray-100 flex justify-center items-center h-screen relative overflow-hidden">
  //       <div
  //         className={`form-container absolute transition-transform duration-500 w-full max-w-md ${isRegistering ? 'opacity-100' : 'opacity-0 hidden'}`}
  //       >
  //         <RegisterForm setIsRegistering={setIsRegistering} />
  //       </div>
  //       <div
  //         className={`form-container absolute transition-transform duration-500 w-full max-w-md ${isRegistering ? 'opacity-0 hidden' : 'opacity-100'}`}
  //       >
  //         <LoginForm setIsRegistering={setIsRegistering} />
  //       </div>
  //     </div>
  //   );
  // };
  
  // const LoginForm = ({ setIsRegistering }) => (
  //   <div className="p-8 w-full bg-white rounded-lg shadow-lg">
  //     <h1 className="text-2xl font-semibold mb-4">Login</h1>
  //     <form action="#" method="POST">
  //       <div className="mb-4">
  //         <label htmlFor="username" className="block text-gray-600">Username</label>
  //         <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
  //       </div>
  //       <div className="mb-4">
  //         <label htmlFor="password" className="block text-gray-600">Password</label>
  //         <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
  //       </div>
  //       <div className="mb-4 flex items-center">
  //         <input type="checkbox" id="remember" name="remember" className="text-blue-500"/>
  //         <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
  //       </div>
  //       <div className="mb-6 text-blue-500">
  //         <a href="#" className="hover:underline">Forgot Password?</a>
  //       </div>
  //       <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
  //     </form>
  //     <div className="mt-6 text-blue-500 text-center">
  //       <button onClick={() => setIsRegistering(true)} className="hover:underline">Sign up Here</button>
  //     </div>
  //   </div>
  // );
  
  // const RegisterForm = ({ setIsRegistering }) => (
  //   <div className="p-8 w-full bg-white rounded-lg shadow-lg">
  //     <h1 className="text-2xl font-semibold mb-4">Register</h1>
  //     <form action="#" method="POST">
  //       <div className="mb-4">
  //         <label htmlFor="username" className="block text-gray-600">Username</label>
  //         <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
  //       </div>
  //       <div className="mb-4">
  //         <label htmlFor="email" className="block text-gray-600">Email</label>
  //         <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
  //       </div>
  //       <div className="mb-4">
  //         <label htmlFor="password" className="block text-gray-600">Password</label>
  //         <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
  //       </div>
  //       <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md py-2 px-4 w-full">Register</button>
  //     </form>
  //     <div className="mt-6 text-blue-500 text-center">
  //       <button onClick={() => setIsRegistering(false)} className="hover:underline">Login Here</button>
  //     </div>
  //   </div>
  // );
 
export default RegisterPage;