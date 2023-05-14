import React, { useState } from "react";
import Sidebar from "./SideBar";
import Articles from "../components/articles";
const Dashboard = () => {
    const [sideBar, setSideBar ] = useState(true);

    return (
        <>
            
                <div className="w-100 bg-white sm:hidden">
                    <button
                        className="align-middle"
                        onClick={() => {
                            setSideBar(!sideBar);
                        }}
                    >
                        <svg
                            className="w-10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            ></path>
                        </svg>
                    </button>
                </div>
           

            <div className="w-100 h-[100vh] flex   gap-2 ">
                <Sidebar display={ [sideBar, setSideBar] } />

                <div className=" flex-1">
                    
                    <Articles/>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
