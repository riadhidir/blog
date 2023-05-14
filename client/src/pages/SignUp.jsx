import { useRef, useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    //check username
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    //check password validity and matching
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd)); //validty
        setValidMatch(pwd === matchPwd); //matching
    }, [pwd, matchPwd]);

    //reset errMsg
    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(
                "/users/register",
                { username: user, password: pwd },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            navigate("/login", { replace: true });
            console.log(response?.data);
            setSuccess(true);

            setUser("");
            setPwd("");
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed");
            }
        }
    };

    return (
        <>
            <main className="w-full h-screen flex flex-col items-center justify-center px-4">
                <div className="max-w-sm w-full text-gray-600">
                    <div className="text-center">
                        <h1 className="text-5xl text-gray-800">
                            <span className="text-indigo-600">Fabri</span>
                            Blog
                        </h1>
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                                Sign up
                            </h3>
                            <p className="">
                                Already have an account?{" "}
                                <Link
                                    to={"/login"}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <p
                                className="text-red-600"
                                style={{
                                    display: errMsg ? "block" : "none",
                                }}
                            >
                                {errMsg}
                            </p>
                            <label className="font-medium ">
                                userName
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={
                                        validName
                                            ? "ml-1 inline text-green-600"
                                            : "hidden"
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validName || !user
                                            ? "hidden"
                                            : "ml-1 inline text-red-600"
                                    }
                                />
                            </label>
                            <input
                                type="text"
                                autoFocus
                                onChange={(e) => setUser(e.target.value)}
                                autoComplete="off"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg "
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Password
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={
                                        validPwd
                                            ? "ml-1 inline text-green-600"
                                            : "hidden"
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validPwd || !pwd
                                            ? "hidden"
                                            : "ml-1 inline text-red-600"
                                    }
                                />
                            </label>
                            <input
                                type="password"
                                required
                                onChange={(e) => setPwd(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Confirm Password
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={
                                        validMatch && matchPwd
                                            ? "ml-1 inline text-green-600"
                                            : "hidden"
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validMatch || !matchPwd
                                            ? "hidden"
                                            : "ml-1 inline text-red-600"
                                    }
                                />
                            </label>
                            <input
                                type="password"
                                required
                                onChange={(e) => setMatchPwd(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>

                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 disabled:bg-indigo-400"
                            disabled={
                                !validName || !validPwd || !validMatch
                                    ? true
                                    : false
                            }
                        >
                            Create account
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default SignUp;
