import React, { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
const CategorieEdit = () => {
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [title, setTitle] = useState("");
    const URL = `/categories/${id}`;
    const {
        data: category,
        isLoading,
        error,
    } = useQuery(["category"], async () => {
        const response = await axiosPrivate.get(URL, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        console.log(response.data);
        setTitle(response.data.title);
        return response.data;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.patch(
                URL,
                { title },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            
            navigate(-1);
        } catch (err) {
            if (!err?.response) {
                console.log(err.message);
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing field");
            } else {
                setErrMsg("Login Failed");
            }
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <p className="text-red-700">{errMsg}</p>
            <div className="mb-6">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Title
                </label>
                <input
                    type="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setErrMsg("");
                    }}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="category_1, category_2 ..."
                />
            </div>

            <button
                type="submit"
                className="text-white mr-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
            <Link
            to="/dashboard/categories"
                className="text-white mr-5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                
                >
                ff
            </Link>
        </form>
    );
};

export default CategorieEdit;
