import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../../hooks/useToken';

const Login = () => {
  const {signIn,providerLogin} = useContext(AuthContext);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loginError,setLoginError] = useState('');
  const [loginUserEmail,setLoginUserEmail] = useState('');
  const googleProvider = new GoogleAuthProvider();

  // const [token] = useToken(loginUserEmail);

  const handleLogin = (event) =>{
    event.preventDefault();
    setLoginError('');
    signIn(email,password)
    .then(result =>{
      const user = result.user;
      console.log(user);
      toast.success('User Logged in Successfully', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      setLoginUserEmail(email);
    })
    .catch(error=>{
      console.log(error.message);
      setLoginError(error.message);
    })
  }

  const saveUser = (name,email) =>{
    const user = {name,email};
    fetch('http://localhost:5000/users',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data);
      toast.success('User Saved Successfully', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      setLoginUserEmail(email);
    })
  }

  const handleGoogleSignIn = () =>{
    providerLogin(googleProvider)
    .then(result =>{
      const user = result.user;
      console.log(user);
      saveUser(user.displayName,user.Email);
      // setLoginUserEmail(user.email);
    })
  }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={event => setEmail(event.target.value)}
                  value={password}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
              onClick={handleLogin}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <div className="divider">OR</div>
              <button
                type="submit"
                onClick={handleGoogleSignIn}
                className="flex  w-full justify-center rounded-md bg-orange-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              > 
              {/* <AiOutlineGoogle/> */}
                Continue With Google
              </button>
            </div>
            {loginError && <p className='text-red-500'>{loginError}</p>}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to={'/signup'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register From Here.
            </Link>
          </p>
        </div>
      </div>
    );
};

export default Login;