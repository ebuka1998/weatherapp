import React from 'react'

const Header = ({
        location,
        country,
        image,
        temperature,
        desc,
        feelslike,
        wind,
        visibility,
        barometer,
        humidity,
        dewpoint
    }) => {
    return (
        <div>
        <div className="flex mt-24 justify-center mb-6">
            <h1 className="text-center text-4xl text-white">{location}, {country}</h1>
        </div>
           <div className="flex justify-center">
                <div className="mr-4">
                    <img src={image} alt="" className="mt-1 w-16" />
                </div>
                <div className="flex flex-row">
                    <h1 className="text-5xl text-white">{temperature}</h1>
                    <sup className="text-lg text-white">
                        o
                    </sup>
                </div>
                <div className="flex flex-col ml-6">
                    <div><sup className="text-xl font-semibold text-white">C</sup></div>
                    <div><sup className="text-base font-light text-white">F</sup></div>
                </div>
           </div>
           <div className="mt-2">
               <h1 className="text-center text-lg text-white">{desc}</h1>
           </div>
           <div className="flex justify-between mt-4">
               <div className="mr-3">
                   <h1 className="text-white text-base">Feels like {feelslike}<sup>o</sup></h1>
               </div>
               <div className="mr-3">
                   <h1 className="text-white text-base">Wind {wind} mph</h1>
               </div>
               <div className="mr-3">
                   <h1 className="text-white text-base">Visibility {visibility} mi</h1>
               </div>
           </div>
           <div className="flex justify-between mt-2">
               <div className="mr-3">
                   <h1 className="text-white text-base">Barometer {barometer}<sup>o</sup></h1>
               </div>
               <div className="mr-3">
                   <h1 className="text-white text-base">Humidity {humidity}%</h1>
               </div>
               <div className="mr-3">
                   <h1 className="text-white text-base">Dew point {dewpoint}<sup>o</sup></h1>
               </div>
           </div>
        </div>
    )
}

export default Header
