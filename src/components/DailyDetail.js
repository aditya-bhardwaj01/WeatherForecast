import React, { Component } from 'react';
import "./DailyDetail.css"
import Spinner from "./Spinner";
import sunny from "./sunny.gif";
import partialCloudy from "./partial_cloudy.gif";
import cloudy from "./cloudy.gif";
import rainy from "./rainy.gif";
import { Link } from "react-router-dom";

export class DailyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekDay: "",
            dayWeather: {},
            sunrise: "",
            sunset: "",
            moonrise: "",
            moonset: "",
            daytemp: "",
            nighttemp: "",
            maxtemp: "",
            mintemp: "",
            pressure: "",
            humidity: "",
            dewpoint: "",
            windspeed: "",
            cloud: "",
            direction: "",
            windgust: "",
            weather: "",
            loading: false
        };
    }

    getWindDegree = (angle) => {

        if (angle >= 348.75 || angle < 11.25) {
            return 'NORTH';// + Math.ceil(angle);
        }
        else if (angle >= 11.25 && angle < 33.75) {
            return 'NORTH-NORTH EAST';// + Math.ceil(angle);
        }
        else if (angle >= 33.75 && angle < 56.25) {
            return 'NORTH EAST';// + Math.ceil(angle);
        }
        else if (angle >= 56.25 && angle < 78.75) {
            return 'EAST-NORTH EAST';// + Math.ceil(angle);
        }
        else if (angle >= 78.75 && angle < 101.25) {
            return 'EAST';// + Math.ceil(angle);
        }
        else if (angle >= 101.25 && angle < 123.75) {
            return 'EAST-SOUTH EAST';// + Math.ceil(angle);
        }
        else if (angle >= 123.75 && angle < 146.25) {
            return 'SOUTH EAST';// + Math.ceil(angle);
        }
        else if (angle >= 146.25 && angle < 168.75) {
            return 'SOUTH-SOUTH EAST';// + Math.ceil(angle);
        }
        else if (angle >= 168.75 && angle < 191.25) {
            return 'SOUTH';// + Math.ceil(angle);
        }
        else if (angle >= 191.25 && angle < 213.75) {
            return 'SOUTH-SOUTH WEST';// + Math.ceil(angle);
        }
        else if (angle >= 213.75 && angle < 236.25) {
            return 'SOUTH WEST';// + Math.ceil(angle);
        }
        else if (angle >= 236.25 && angle < 258.75) {
            return 'WEST-SOUTH WEST';// + Math.ceil(angle);
        }
        else if (angle >= 258.75 && angle < 281.25) {
            return 'WEST';// + Math.ceil(angle);
        }
        else if (angle >= 281.25 && angle < 303.75) {
            return 'WEST-NORTH WEST';// + Math.ceil(angle);
        }
        else if (angle >= 303.75 && angle < 326.25) {
            return 'NORTH WEST';// + Math.ceil(angle);
        }
        else if (angle >= 326.25 && angle < 348.75) {
            return 'NORTH-NORTH WEST';// + Math.ceil(angle);
        }
    }

    getTimeInDate = (date) => {
        return window.moment(date * 1000).format('HH:mm')
    }

    displayWeather = (cloudCover) => {
        if (cloudCover <= 20) {
            return <img src={sunny} alt="loading" className="img-fluid"></img>;
        }
        else if (cloudCover > 20 && cloudCover <= 50) {
            return <img src={partialCloudy} alt="loading" className="img-fluid"></img>;
        }
        else if (cloudCover > 50 && cloudCover <= 80) {
            return <img src={cloudy} alt="loading" className="img-fluid"></img>;
        }
        else if (cloudCover > 80 && cloudCover <= 100) {
            return <img src={rainy} alt="loading" className="img-fluid"></img>;
        }
    };

    updateDailyForecast = async () => {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.props.latitude}&lon=${this.props.longitude}&exclude=current,minutely,hourly&appid=5538732fae3c139814b51fb860b1197b`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        const reqDay = this.props.weekDay;
        for (var i = 1; i < parsedData.daily.length; i++) {
            if (reqDay === window.moment(parsedData.daily[i].dt * 1000).format('dddd')) {
                this.setState({
                    dayWeather: parsedData.daily[i]
                })
                break;
            }
        }

        this.setState({
            weekDay: reqDay,
            sunrise: window.moment(this.state.dayWeather.sunrise * 1000).format("HH:mm"),
            sunset: window.moment(this.state.dayWeather.sunset * 1000).format("HH:mm"),
            moonrise: window.moment(this.state.dayWeather.moonrise * 1000).format("HH:mm"),
            moonset: window.moment(this.state.dayWeather.moonset * 1000).format("HH:mm"),

            nighttemp: Math.ceil((parseInt(this.state.dayWeather.temp.night) - 273.15).toFixed(2)),
            maxtemp: Math.ceil((parseInt(this.state.dayWeather.temp.max) - 273.15).toFixed(2)),
            mintemp: Math.ceil((parseInt(this.state.dayWeather.temp.min) - 273.15).toFixed(2)),
            daytemp: Math.ceil((parseInt(this.state.dayWeather.temp.day) - 273.15).toFixed(2)),

            pressure: this.state.dayWeather.pressure + ' mb',
            humidity: this.state.dayWeather.humidity + '%',
            dewpoint: Math.ceil((parseInt(this.state.dayWeather.dew_point) - 273.15).toFixed(2)),
            windspeed: Math.ceil(this.state.dayWeather.wind_speed * 6.6) + ' km/h',
            cloud: this.state.dayWeather.clouds + '%',
            direction: this.getWindDegree(this.state.dayWeather.wind_deg),
            windgust: Math.ceil(this.state.dayWeather.wind_gust * 6.6) + ' km/h',
            weather: this.state.dayWeather.weather[0].main + " (" + this.state.dayWeather.weather[0].description[0].toUpperCase() + this.state.dayWeather.weather[0].description.substring(1) + ")",
            loading: false
        })
    }

    componentDidMount() {
        this.updateDailyForecast();
    }

    render() {
        return (
            <>
                {this.state.loading ? <Spinner /> :
                    <div>
                        <div className='DailyDetail'>
                            <Link className='gotoDetail'
                                to="/home">
                                <strong>&larr;Go back</strong>
                            </Link>
                            <div className='weekDayChild'>
                                <h2>
                                    {this.state.weekDay}
                                    {this.displayWeather(parseInt(this.state.cloud))}
                                </h2>
                            </div>
                            <div className='DayWeather'>
                                {/* style={{textAlign: 'left'}} */}
                                <i className="time-zone"><strong>*In accordance with your time zone</strong></i>
                                <div className="row justify-content-start SubDetail" style={{ marginTop: '0.3em' }}>
                                    <div className="row justify-content-around">
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">*Sunrise: &nbsp;&nbsp;</span>
                                            {this.state.sunrise}
                                            <hr />
                                        </div>
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">*Sunset: &nbsp;&nbsp;</span>
                                            {this.state.sunset}
                                            <hr />
                                        </div>
                                    </div>

                                    <div className="row justify-content-around">
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">*Moonrise: &nbsp;&nbsp;</span>
                                            {this.state.moonrise}
                                        </div>
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">*Moonset: &nbsp;&nbsp;</span>
                                            {this.state.moonset}
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-start SubDetail">
                                    <div className="row justify-content-around">
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">Day Temp: &nbsp;&nbsp;</span>
                                            {this.state.daytemp}&deg;C
                                            <hr />
                                        </div>
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">Night Temp: &nbsp;&nbsp;</span>
                                            {this.state.nighttemp}&deg;C
                                            <hr />
                                        </div>
                                    </div>

                                    <div className="row justify-content-around">
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">Max Temp: &nbsp;&nbsp;</span>
                                            {this.state.maxtemp}&deg;C
                                        </div>
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">Min Temp: &nbsp;&nbsp;</span>
                                            {this.state.mintemp}&deg;C
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-start SubDetail">
                                    <div className="row justify-content-around">
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">Pressure: &nbsp;&nbsp;</span>
                                            {this.state.pressure}
                                            <hr />
                                        </div>
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">Humidity: &nbsp;&nbsp;</span>
                                            {this.state.humidity}
                                            <hr />
                                        </div>
                                    </div>

                                    <div className="row justify-content-around">
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">Dew point: &nbsp;&nbsp;</span>
                                            {this.state.dewpoint}&deg;C
                                            <hr />
                                        </div>
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">Wind speed: &nbsp;&nbsp;</span>
                                            {this.state.windspeed}
                                            <hr />
                                        </div>
                                    </div>

                                    <div className="row justify-content-around">
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">Cloud: &nbsp;&nbsp;</span>
                                            {this.state.cloud}
                                            <hr />
                                        </div>
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">Wind Direction: &nbsp;&nbsp;</span>
                                            {this.state.direction}
                                            <hr />
                                        </div>
                                    </div>

                                    <div className="row justify-content-around">
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">Wind gust: &nbsp;&nbsp;</span>
                                            {this.state.windgust}
                                        </div>
                                        <div className="col-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            <span className="section">Weather: &nbsp;&nbsp;</span>
                                            {this.state.weather}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link className='gotoDetail'
                                to="/home">
                                <strong>&larr;Go back</strong>
                            </Link>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default DailyDetail