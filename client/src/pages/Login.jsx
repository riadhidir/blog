
import { useState, useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import axios from "../api/axios";

import useAuth from "../hooks/useAuth";
const Login = () => {
    const {auth,setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('/users/auth',{username, password},  {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        const accessToken = response?.data?.accessToken;
      const id = response?.data?.id;
        //decode accesstoken to get use id
        const roles = [response?.data?.roles];
        setAuth({ username, password, roles, accessToken, id});

        
        

        //clear state and controlled inputs
        //need value attrib on inputs for this
        setUsername('');
        setPassword('');
        navigate(from, { replace: true });
        }catch(err){
            if (!err?.response) {
                console.log(err.message)
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Wrong Username or Password');
            } else {
                setErrMsg('Login Failed');
            }
        }
    };

  return ( 
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                <h1 className="text-5xl text-gray-800">
            <span className="text-indigo-600">Fabri</span>Blog
          </h1>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                        <p className="">Don't have an account? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link></p>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <div>
                    <p
                                    className="text-red-600"
                                    style={{
                                        display: errMsg ? "block" : "none",
                                    }}
                                >
                                    {errMsg}
                                </p>
                        <label className="font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            required
                            autoFocus
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={username}
                            onChange={(e)=> setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}

                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Sign in
                    </button>
                    <div className="text-center">
                        <Link to="/" className="hover:text-indigo-600">Forgot password?</Link>
                    </div>
                </form>
            </div>
        </main>
  )
}

export default Login