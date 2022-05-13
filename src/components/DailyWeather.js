import React, { Component } from 'react';
import "./DailyWeather.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

export class DailyWeather extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     sunrise: "",
        //     sunset: "",
        //     moonrise: "",
        //     moonset: "",
        //     daytemp: "",
        //     nighttemp: "",
        //     maxtemp: "",
        //     mintemp: "",
        //     pressure: "",
        //     humidity: "",
        //     dewpoint: "",
        //     windspeed: "",
        //     cloud: "",
        //     direction: "",
        //     windgust: "",
        //     weather: ""
        // };
        this.weekDay = this.weekDay.bind(this);
    }

    // getWindDegree = (angle) => {

    //     if (angle >= 348.75 || angle < 11.25) {
    //         return 'NORTH';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 11.25 && angle < 33.75) {
    //         return 'NORTH-NORTH EAST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 33.75 && angle < 56.25) {
    //         return 'NORTH EAST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 56.25 && angle < 78.75) {
    //         return 'EAST-NORTH EAST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 78.75 && angle < 101.25) {
    //         return 'EAST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 101.25 && angle < 123.75) {
    //         return 'EAST-SOUTH EAST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 123.75 && angle < 146.25) {
    //         return 'SOUTH EAST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 146.25 && angle < 168.75) {
    //         return 'SOUTH-SOUTH EAST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 168.75 && angle < 191.25) {
    //         return 'SOUTH';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 191.25 && angle < 213.75) {
    //         return 'SOUTH-SOUTH WEST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 213.75 && angle < 236.25) {
    //         return 'SOUTH WEST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 236.25 && angle < 258.75) {
    //         return 'WEST-SOUTH WEST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 258.75 && angle < 281.25) {
    //         return 'WEST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 281.25 && angle < 303.75) {
    //         return 'WEST-NORTH WEST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 303.75 && angle < 326.25) {
    //         return 'NORTH WEST';// + Math.ceil(angle);
    //     }
    //     else if (angle >= 326.25 && angle < 348.75) {
    //         return 'NORTH-NORTH WEST';// + Math.ceil(angle);
    //     }
    // }

    // getTimeInDate = (date) => {
    //     return window.moment(date * 1000).format('HH:mm')
    // }

    // updateDailyForecast = () => {
    //     this.setState({
    //         sunrise: this.props.obj.sunrise,
    //         sunset: this.props.obj.sunset,
    //         moonrise: this.props.obj.moonrise,
    //         moonset: this.props.obj.moonset,
    //         daytemp: Math.ceil((parseInt(this.props.obj.temp.day) - 273.15).toFixed(2)),
    //         nighttemp: Math.ceil((parseInt(this.props.obj.temp.night) - 273.15).toFixed(2)),
    //         maxtemp: Math.ceil((parseInt(this.props.obj.temp.max) - 273.15).toFixed(2)),
    //         mintemp: Math.ceil((parseInt(this.props.obj.temp.min) - 273.15).toFixed(2)),
    //         pressure: this.props.obj.pressure + ' mb',
    //         humidity: this.props.obj.humidity + '%',
    //         dewpoint: Math.ceil((parseInt(this.props.obj.dew_point) - 273.15).toFixed(2)),
    //         windspeed: Math.ceil(this.props.obj.wind_speed * 6.6) + ' km/h',
    //         cloud: this.props.obj.clouds + '%',
    //         direction: this.props.obj.wind_deg,
    //         windgust: Math.ceil(this.props.obj.wind_gust * 6.6) + ' km/h',
    //         weather: this.props.obj.weather[0].main + " (" + this.props.obj.weather[0].description[0].toUpperCase() + this.props.obj.weather[0].description.substring(1) + ")",
    //     })
    // }

    // componentDidMount() {
    //     this.updateDailyForecast();
    // }

    weekDay = () => {
        // console.log(window.moment(this.props.obj.dt * 1000).format('dddd'));
        this.props.setWeekDay(window.moment(this.props.obj.dt * 1000).format('dddd'));
    }


    render() {
        return (
            <>
                <div className='DailyWeather'>
                    <div className="innerComp">
                        <div className='weekDay'>
                            <div className="d-flex justify-content-between head-title">
                                <div className='name'><strong>{window.moment(this.props.obj.dt * 1000).format('dddd')}</strong></div>
                                <Link to="/dailyDetail" style={{ fontWeight: 'bold', background: 'transparent', border: 'none', color: 'white', marginTop: 6, textDecoration: 'none' }}
                                onClick={this.weekDay}>
                                    <strong className='arrow'>&rarr;</strong>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DailyWeather