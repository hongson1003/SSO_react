import Carousel from 'react-bootstrap/Carousel';
import './WeatherState.scss';
import axios from '../../customize/axios';
import { useState, useEffect, useRef } from 'react';

const WeatherState = (props) => {

    const [dataWeather, setDataWeather] = useState([]);

    const getWeatherByLocation = async (locationId) => {
        // 1236594 . woeid
        let res = await axios.post(`http://localhost:8081/get-data-by-url`, {
            url: `api/location/${locationId}`
        })
        if (res && res.title) {
            console.log(res);
            setDataWeather(res.consolidated_weather);
        }
    }

    const allWeatherState = {
        "Snow": "sn",
        "Sleet": "sl",
        "Hail": "h",
        "Thunderstorm": "t",
        "Heavy Rain": "hr",
        "Light Rain": "lr",
        "Showers": "s",
        "Heavy Cloud": "hc",
        "Light Cloud": "lc",
        "Clear": "c"
    }

    const getImageUrl = (weatherState) => {
        const fetchState = allWeatherState[weatherState];
        return `${process.env.REACT_APP_POSTGRESS}/static/img/weather/${fetchState}.svg`;
    }
    let firstOne = useRef(false);
    useEffect(() => {
        if (firstOne.current === false) {
            getWeatherByLocation(1236594);
            firstOne.current = true;
        }
    }, [])

    return (
        <div className='weather-container'>
            {dataWeather?.length > 0 ?
                <Carousel variant="dark" >
                    {dataWeather.map((item, index) => {
                        return (
                            <Carousel.Item key={`item-${index}`}>
                                <img
                                    className="d-block w-100"
                                    src={getImageUrl(item.weather_state_name)}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>{item.weather_state_name}</h3>
                                    <p>{item.max_temp}&#8451; - <span style={{ color: '#70757a' }}>{item.min_temp}&#8451;</span></p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })}
                </Carousel> :
                <h1 className='fst-italic'>Vui lòng đăng nhập trước khi sử dụng dịch vụ !!!</h1>
            }
        </div>)
}

export default WeatherState;