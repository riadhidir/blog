import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { useState } from "react";


const Categories = () => {
    const URL = `/categories`;
    const axiosPrivate = useAxiosPrivate();
    const [title, setTitle] = useState();
    const [errMsg, setErrMsg] = useState("");
    

    const {
        data: categories,
        isLoading,
        error,
        refetch,
    } = useQuery(["categories"], async () => {
        const response = await axiosPrivate.get(
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

    const handleDelete = async (id) => {
        try {
            const response = await axiosPrivate.delete(
                URL + `/${id}`,

                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            refetch();
        } catch (err) {
            if (!err?.response) {
                console.log(err.message);
                alert("No Server Response");
            }
        }
    };

    const handleAddition = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post(URL ,{title},

                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
                setTitle("");
                setErrMsg('');
            refetch();
        } catch (err) {
            if (!err?.response) {
                console.log(err.message);
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing field");
            } else {
                setErrMsg("server crash");
            }
        }
    };
    return isLoading ? (
        <h1>loading</h1>
    ) : (
        <>
            {/* <!-- Modal toggle --> */}
            <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                className="block  mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Add Category
            </button>
            

            {/* <!-- Main modal --> */}
            <div
                id="authentication-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed top-0 left-0 sm:top-1/2 sm:left-1/2  z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            data-modal-hide="authentication-modal"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                Add a Category
                            </h3>
                            <form className="space-y-6" onSubmit={handleAddition}>
                                <p className="text-red-700">{errMsg}</p>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={(e)=>setTitle(e.target.value)}
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="category_1 ..."
                                        required
                                    />
                                </div>

                                <div className="flex gap-2 justify-end ">
                                    <button
                                        type="button"
                                        data-modal-hide="authentication-modal"
                                        className=" text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            data-modal-hide="authentication-modal"

                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 ">
                {categories.map((item) => {
                    return (
                        <div
                            className="max-w-sm  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                            key={item._id}
                        >
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {item.title}
                            </h5>
                            <div className="inline-flex justify-end  w-full gap-2">
                                <Link
                                    to={`${item._id}/edit`}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Categories;
