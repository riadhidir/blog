import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const ArticleAdd = () => {
    // const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate()
   const {auth} = useAuth();
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [cat, setCat] = useState([]);
    const URL = `/articles`;
    
    const { data: categories, refetch } = useQuery(["categories"], async () => {
        const response = await axiosPrivate.get(
            "/categories",
            {},
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );

        console.log(response.data);
        return response.data;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post(
                URL,
                { title, content, categories:cat, user:auth.id },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            navigate(-1);
        } catch (err) {
            if (!err?.response) {
                console.log(err.message);
                alert("No Server Response");
            } else if (err.response?.status === 400) {
                alert("Missing field");
            } else {
                alert("Login Failed");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    title
                </label>
                <input
                    type="text"
                    id="email"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="article_1"
                    required
                />
            </div>
            <div className="mb-6">
                <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Select an option
                </label>
                <select
                onChange={(e)=>setCat([e.target.value])}
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ><option selected disabled>Choose a category</option>
                    {categories?.map((item)=>{
                        return <option  key={item._id}  value={item._id} >{item.title}</option> 
                    })}
                    
                    
                </select>
            </div>
            <div className="mb-6">
                <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    content
                </label>
                <textarea
                    id="message"
                    rows="4"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                ></textarea>
            </div>

            <button
                type="submit"
                className="text-white mr-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
            <Link
                type="button"
                to="/dashboard/articles"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 "
            >
                Cancel
            </Link>
        </form>
    );
};

export default ArticleAdd;
