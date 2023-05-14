// import React from 'react'

// function Dashboard() {
//   return (
//     <div>Dashboard</div>
//   )
// }

// export default Dashboard

import { useEffect, useRef, useState } from "react";
// import useRefreshToken from "../hooks/useRefreshToken";

const Menu = (props) => {
    const { children, items } = props;
    const [isOpened, setIsOpened] = useState(false);
    return (
        <div className="">
            <button
                className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                onClick={() => setIsOpened(!isOpened)}
            >
                <div className="flex items-center gap-x-2">{children}</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-5 h-5 duration-150 ${
                        isOpened ? "rotate-180" : ""
                    }`}
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {isOpened ? (
                <ul className="mx-4 px-2 border-l text-sm font-medium">
                    {items.map((item, idx) => (
                        <li key={idx}>
                            <a
                                href={item.href}
                                className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                            >
                                {item.icon ? (
                                    <div className="text-gray-500">
                                        {item.icon}
                                    </div>
                                ) : (
                                    ""
                                )}
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                ""
            )}
        </div>
    );
};

const Sidebar = (props) => {
    const [ sidebar, setSideBar ] = props.display;
    
    const navigation = [
        {
            href: "",
            name: "articles",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                </svg>
            ),
        },

        {
            href: "f",
            name: "categories",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                    />
                </svg>
            ),
        },
    ];

    const navsFooter = [
        // {
        //     href: 'javascript:void(0)',
        //     name: 'Help',
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        //         <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        //     </svg>
        //     ,
        // },
        // {
        //     href: 'javascript:void(0)',
        //     name: 'Settings',
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        //         <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        //         <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        //     </svg>
        //     ,
        // }
    ];

    const nestedNav = [
        { name: "Cards", href: "javascript:void(0)", icon: "" },
        { name: "Chekouts", href: "javascript:void(0)", icon: "" },
        { name: "Payments", href: "javascript:void(0)", icon: "" },
        { name: "Get paid", href: "javascript:void(0)", icon: "" },
    ];

    const profileRef = useRef();

    const [isProfileActive, setIsProfileActive] = useState(false);

    useEffect(() => {
        const handleProfile = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target))
                setIsProfileActive(false);
        };
        document.addEventListener("click", handleProfile);
    }, []);

    return (
        <>
            <nav className="fixed sm:static top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-80 hidden  sm:block  " style={{display: sidebar ? 'block':'none'}}>
                <div className="flex flex-col h-full px-4">
                    <button className="self-end sm:hidden" onClick={()=> setSideBar(!sidebar)}>
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
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                    <div className="h-20 flex items-center pl-2">
                        <div className="w-full flex items-center gap-x-4">
                            <img
                                src="https://randomuser.me/api/portraits/women/79.jpg"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <span className="block text-gray-700 text-sm font-semibold">
                                    Alivika tony
                                </span>
                                <span className="block mt-px text-gray-600 text-xs">
                                    Hobby Plan
                                </span>
                            </div>
                            <div className="relative flex-1 text-right">
                                <button
                                    ref={profileRef}
                                    className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                                    onClick={() =>
                                        setIsProfileActive(!isProfileActive)
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {isProfileActive ? (
                                    <div className="absolute z-10 top-12 right-0 w-64 rounded-lg bg-white shadow-md border text-sm text-gray-600">
                                        <div className="p-2 text-left">
                                            <span className="block text-gray-500/80 p-2">
                                                alivika@gmail.com
                                            </span>
                                            <button className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="overflow-auto">
                        <ul className="text-sm font-medium flex-1">
                            {navigation.map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={item.href}
                                        className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                                    >
                                        <div className="text-gray-500">
                                            {item.icon}
                                        </div>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                            {/* <li>
                                <Menu items={nestedNav}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    Billing
                                </Menu>
                            </li> */}
                        </ul>

                        {/*     footer */}
                        {/* <div className="pt-2 mt-2 border-t">
                            <ul className="text-sm font-medium">
                                {
                                    navsFooter.map((item, idx) => (
                                        <li key={idx}>
                                            <a href={item.href} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                <div className="text-gray-500">{item.icon}</div>
                                                {item.name}
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div> */}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
