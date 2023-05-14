import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Roles from "./Roles";
export default () => {
    let { id } = useParams();
    const {auth} = useAuth( )
    
const ROLES = {
    ADMIN: "dcac",
    USER: "28c6",
};
    const navigate = useNavigate();
    const URL = `http://localhost:3000/api/articles/${id}`;
    // const queryClient = useQueryClient()
    const {
        data: post,
        isLoading,
        error,
        refetch
    } = useQuery(["post"], async () => {
        const response = await axios.get(
            URL,
            {},
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );

        console.log(response.data);
        return response.data;
    });
    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                URL ,

                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            navigate('/dashboard/articles')
        } catch (err) {
            if (!err?.response) {
                console.log(err.message);
                alert("No Server Response");
            }
        }
    };
    // console.log(error)
    return (
        <div>
            {isLoading ? (
                <h1>Loading ...</h1>
            ) : (
                <section className="p-10 space-y-5">
                    <div className="inline-flex justify-between w-full">
                         <button className="px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                    onClick={()=>{
                        navigate(-1);
                    }}>
                        Back
                    </button>

                    
                        <Roles allowedRoles={[ROLES.USER, ROLES.ADMIN]}>
                            <div className="inline-flex justify-end  w-full gap-2">
                        <Link
                            to="edit"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                            Delete
                        </button>
                    </div>
                        </Roles>  
                    
                   

                    </div>
                   

                    <h1 className="text-6xl text-center capitalize ">
                        {post.title}
                    </h1>

                    <p className="text-justify">{post.content}</p>
                </section>
            )}
        </div>
    );
};
