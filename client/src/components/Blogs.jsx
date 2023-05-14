import { useQuery } from "@tanstack/react-query";

import {
    Link,
    useLocation,
    useNavigation,
    useOutletContext,
    useSearchParams,
} from "react-router-dom";

import { FetchContext } from "../pages/Home";
import { useContext } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
export default () => {

    // const { fetching } = useContext(FetchContext);
    const {auth} = useAuth();
    const location = useLocation();
    const URL = `/articles${location.search}`;
    const { data: posts, isLoading } = useQuery(["fetching"], async () => {
        const response = await axios.get(
            URL,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );

        return response.data;
    });
    const img =
        "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
    const authorLogo =
        "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg";

    return (

            
        <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
             { auth?.username &&<Link
                to="add"
                className="  mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Add article
            </Link>
            }
            {
                !auth?.roles &&  <div className="text-center">
                <h1 className="text-3xl text-gray-800 font-semibold">Blog</h1>
                <p className="mt-3 text-gray-500">
                    Blogs that are loved by the community. Updated every hour.
                </p>
            </div>
            }
           

            <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {posts?.map((items, key) => (
                    <article
                        className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
                        key={items?._id}
                    >
                        <Link to={`${items._id}`}>
                            <img
                                src={img}
                                loading="lazy"
                                alt={items?.title}
                                className="w-full h-48 rounded-t-md"
                            />
                            <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                                <div className="flex-none w-10 h-10 rounded-full">
                                    <img
                                        src={authorLogo}
                                        className="w-full h-full rounded-full"
                                        alt={items?.user?.username}
                                    />
                                </div>
                                <div className="ml-3">
                                    <span className="block text-gray-900">
                                        {items?.user?.username}
                                    </span>
                                    <span className="block text-gray-400 text-sm">
                                        Jan 4 2022
                                    </span>
                                </div>
                            </div>
                            <div className="pt-3 ml-4 mr-2 mb-3">
                                <h3 className="text-xl text-gray-900">
                                    {items.title}
                                </h3>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
};
