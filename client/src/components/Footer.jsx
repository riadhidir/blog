import { Link } from "react-router-dom"

export default () => {

    const footerNavs = [
        {
            href: 'javascript:void()',
            name: 'Terms'
        },
        {
            href: 'javascript:void()',
            name: 'License'
        },
        {
            href: 'javascript:void()',
            name: 'Privacy'
        },
        {
            href: 'javascript:void()',
            name: 'About us'
        }
    ]
    return (
        <footer className="pt-10 sticky  w-full">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
                <h1 className="text-5xl text-gray-800">
            <span className="text-indigo-600">Fabri</span>Blog
          </h1>
                  
                   
                </div>
                <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
                    <p>© 2022 Float UI Inc. All rights reserved.</p>
                    <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
                        {
                            footerNavs.map((item, idx) => (
                                <li className="text-gray-800 hover:text-gray-500 duration-150" key={idx}>
                                    <Link  to="">
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </footer>
    )
}