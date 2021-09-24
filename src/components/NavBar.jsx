import React from 'react'

const NavBar = ({changeInput, searchWord, search}) => {
    return (
        <div style={{width: '100%', height: '25%', backgroundColor: 'white'}}>
            <div className="flex lg:justify-between items-center lg:mx-24 justify-center">
                <div>
                    <h1 className="hidden sm:flex">weather clone</h1>
                </div>
                <div className="relative">
                    <div className="absolute top-4 left-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div> <input type="text" className="h-14 lg:w-96 w-42 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none" onChange={changeInput} value={searchWord} placeholder="Search place..." />
                    <div className="absolute top-2 right-2"> <button className="h-10 w-16 text-white rounded-lg bg-red-500 hover:bg-red-600" onClick={search}>Search</button> </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
