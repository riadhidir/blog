import React, { useContext } from 'react'

import { useState ,useEffect} from 'react'
import { Link, Navigate, useLocation, useNavigate, useSearchParams ,redirect} from 'react-router-dom'

import { FetchContext } from '../pages/Home'
const Search = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const {fetching,setFetching} = useContext(FetchContext);

    const [q, setQ]  = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{   
        setQ(searchParams.get('q'))
    },[]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("fi")
        setSearchParams({q});
        // window.location.reload();
        setFetching(!fetching);
        console.log(fetching)
        // return <redirect to={`${location.pathname+location.search}`} />;

        

    }
    return (
        <form
            onSubmit={handleSubmit} 
            className="max-w-md px-4  "
            >
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search"
                    value={q}
                    onChange={(e)=>{setQ(e.target.value)}}
                   
                    className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                />
            </div>
        </form>
    )
}
export default () => {
    const [state, setState] = useState(false)

    // Replace javascript:void(0) paths with your paths
    const navigation = [
        // { title: "Features", path: "javascript:void(0)" },
        // { title: "Integrations", path: "javascript:void(0)" },
        // { title: "Customers", path: "javascript:void(0)" },
        // { title: "Pricing", path: "javascript:void(0)" }
    ]

    return (
        <nav className="bg-white border-b w-full md:static md:text-sm md:border-none shadow">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link to="/">
                    <h1 className="text-2xl text-gray-800">
            <span className="text-indigo-600">Fabri</span>Blog
          </h1>
                    </Link>
                    <div className="md:hidden">
                        <button className="text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {/* {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-gray-700 hover:text-indigo-600">
                                        <Link to={item.path} className="block">
                                            {item.title}
                                        </Link>
                                    </li>
                                )
                            })
                        } */}
            <Search/>
                        <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
                        <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
                            
                            <li>
                                <Link to="/dashboard/articles" className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline">
                                    User Space
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
