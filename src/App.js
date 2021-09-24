import React, { useEffect, useState, useRef } from 'react';
import './tailwind.css'
import Header from './components/Header';
import moment from 'moment';
import axios from 'axios'
import NavBar from './components/NavBar';
import Spinner from './components/Spinner';
import ErrorMsg from './components/ErrorMsg';
import './App.css'


function App() {
  const [weather, setWeather] = useState({})
  const [weathers, setWeathers] = useState([])
  const [loading, setLoading] = useState(false)
  const [dailyLoading, setDailyLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchWord, setSearchWord] = useState('')
  const containerDiv = useRef(null)

  
  const slide = function () {
      sideScroll(containerDiv,'right',25,100,10);
  };

  const slideBack = function () {
      sideScroll(containerDiv,'left',25,100,10);
  };

  function sideScroll(element,direction,speed,distance,step){
      let scrollAmount = 0;
      var slideTimer = setInterval(function(){
          if(direction === 'left'){
              element.current.scrollLeft -= step;
          } else {
              element.current.scrollLeft += step;
          }
          scrollAmount += step;
          if(scrollAmount >= distance){
              window.clearInterval(slideTimer);
          }
      }, speed);
  }
  
  const getWeather = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather', {
        params: {
          q: 'aba,ng',
          id: '2172797',
          lang: 'null',
          units: 'imperial',
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
      })
      setWeather(data)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  const getWeathers = async () => {
    try {
      setDailyLoading(true)
      const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/forecast', {
        params: {q: 'aba, ng'},
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
      })
     
      const x = data?.list.filter((v,i,a)=>a.findIndex(t=>(t.dt_txt.split(" ")[0] === v.dt_txt.split(" ")[0]))===i)
      setWeathers(x)
      setDailyLoading(false)
    } catch (error) {
      setError(error)
      setDailyLoading(false)
    }
  }

  const searchWeather = async () => {
    try {
      const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: {
          q: searchWord,
          cnt: '1',
          mode: 'null',
          type: 'link, accurate',
          units: 'imperial, metric'
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
      })
      setWeather(data?.list[0])
    } catch (error) {
      console.log(error)
    }
  }

  const search = (e) => {
    e.preventDefault()
    if(searchWord === '') return
    searchWeather()
  }

 
  useEffect(() => {
    getWeather()
    getWeathers()
  }, [])
 
 
  return (
    <div >
      <NavBar 
        changeInput={(e) => setSearchWord(e.target.value)} 
        searchWord={searchWord}
        search={search}
      />
      {
        error ? <div className="bg-gradient-to-l">  
        <ErrorMsg/></div> :
        <div className="bg-gradient-to-l">
        <div className="flex justify-center">
        {
          loading ? <Spinner/> :
            <Header
            location={weather.name}
            country={weather?.sys?.country}
            image={`http://openweathermap.org/img/wn/${weather.weather && weather.weather[0]?.icon}@2x.png`}
            temperature={Math.round(weather?.clouds?.all).toString() }
            desc={weather.weather && weather.weather[0]?.description}
            feelslike={weather?.main?.feels_like}
            wind={weather?.wind?.speed}
            visibility={weather?.visibility}
            barometer={weather?.main?.pressure}
            humidity={weather?.main?.humidity}
            dewpoint={weather?.wind?.deg}
          />
        }
        
      </div>
      <div className=" max-w-4xl mx-auto px-4 py-8 md:p-8 w-full mt-12">
        <h1 className="text-white text-base mb-8 lg:ml-8 ml-16">Daily</h1>
        <div className="flex justify-around">
          <div className="mt-8 text-lg mr-3 cursor-pointer" onClick={slideBack}><h1 className="text-3xl text-white">{"<"}</h1></div>
          {
            dailyLoading ? <Spinner/> : 
            <div className="flex justify-between overflow-x-auto whitespace-nowrap example" ref={containerDiv}>
            {
              weathers && weathers?.map((w) => (
                <div key={w.dt} className="flex flex-col mr-14">
                  <h1 className="text-lg text-white">{moment(w?.dt_txt.split(" ")[0]).format("MMM Do")}</h1>
                  <img src={`http://openweathermap.org/img/wn/${w.weather && w.weather[0]?.icon}@2x.png`} alt="" className="w-12 p-0 ml-0 h-12"/>
                  <h1 className="mt-0 text-lg text-white">{w?.clouds?.all}<sup>o</sup></h1>
                  <h1 className="mt-1 text-lg text-white">
                    {w.weather && w.weather[0]?.description}
                  </h1>
                </div>
              ))
            }
            </div>
          }
         
          <div className="mt-8 text-lg ml-2 cursor-pointer" onClick={slide}><h1 className="text-3xl text-white">{">"}</h1></div>
        </div>
       
      </div>           
    </div>
      }
     
    </div>
  );
}

export default App;
