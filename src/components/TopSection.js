import React, { Component } from "react";
import ExtraInfo from "./ExtraInfo";
import Spinner from "./Spinner";
import DailyWeather from "./DailyWeather";
import "./TopSection.css";
import sunny from "./sunny.gif";
import partialCloudy from "./partial_cloudy.gif";
import cloudy from "./cloudy.gif";
import rainy from "./rainy.gif";
import { Link } from "react-router-dom";

export class TopSection extends Component {
    intervalTime;
    intervalDay;

    getTime = () => {
        let today = new Date();
        return (
            (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()) +
            ":" +
            (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes())
        );

        // let today = this.state.time;

        // return window.moment(today * 1000).format('HH:mm');
    };

    getDay = () => {
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return window.moment(new Date()).format("dddd") + ', ' + window.moment(new Date()).format("DD") + " " + month[parseInt(window.moment(new Date()).format("MM")) - 1];
    };

    displayWeather = (cloudCover) => {
        if(cloudCover<=20){
            return <img src={sunny} alt="loading" className="img-fluid"></img>;
        }
        else if(cloudCover>20 && cloudCover<=50){
            return <img src={partialCloudy} alt="loading" className="img-fluid"></img>;
        }
        else if(cloudCover>50 && cloudCover<=80){
            return <img src={cloudy} alt="loading" className="img-fluid"></img>;
        }
        else if(cloudCover>80 && cloudCover<=100){
            return <img src={rainy} alt="loading" className="img-fluid"></img>;
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            time: this.getTime(),
            day: this.getDay(),
            humidity: "",
            pressure: "",
            windSpeed: "",
            sunrise: "",
            sunset: "",
            timezone: "",
            temp: "",
            cloud: "",
            loading: false,
            daily: [],
        };
    }

    updateWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.props.latitude}&lon=${this.props.longitude}&exclude=minutely,hourly&appid=5538732fae3c139814b51fb860b1197b`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            daily: parsedData.daily.slice(1),
            // ************** //
            // time: parsedData.current.dt,
            // day: parsedData.current.dt,
            // ************* //
            timezone: parsedData.timezone,
            humidity: parsedData.current.humidity + "%",
            windSpeed: Math.ceil(parseFloat(parsedData.current.wind_speed) * 3.6) + " km/h",
            sunrise: window.moment(parsedData.current.sunrise * 1000).format("HH:mm"),
            sunset: window.moment(parsedData.current.sunset * 1000).format("HH:mm"),
            temp: Math.ceil((parseInt(parsedData.current.temp) - 273.15).toFixed(2)),
            cloud: parsedData.current.clouds + "%",
            loading: false
        });
    };

    async componentDidMount() {
        this.intervalTime = setInterval(() => {
            this.setState({ time: this.getTime() });
        }, 1000);

        this.intervalDay = setInterval(() => {
            this.setState({ day: this.getDay() });
        }, 1000);
        this.updateWeather();
    }

    componentWillUnmount() {
        clearInterval(this.intervalTime);
        clearInterval(this.intervalDay);
    }

    render() {
        return (
            <>
                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <div>
                        <div className="TopSection d-flex justify-content-between">
                            <div className="left-section">
                                <div className="time-date">
                                    <span className="time">
                                        {this.getTime()}
                                        {this.displayWeather(parseInt(this.state.cloud))}
                                        {/* <img src={rainy} alt="loading" className="img-fluid"></img> */}

                                    </span>
                                    <p className="date">
                                        <span>{this.getDay()}</span>
                                    </p>
                                </div>

                                <ExtraInfo
                                    humidity={this.state.humidity}
                                    cloud={this.state.cloud}
                                    sunrise={this.state.sunrise}
                                    sunset={this.state.sunset}
                                    temp={this.state.temp}
                                />
                                <i className="time-zone" style={{ fontSize: '65%', color: 'black' }}><strong>*In accordance with your time zone</strong></i>
                            </div>


                            {/* <img src={weather} alt="loading" className="img-fluid"></img> */}
                            <div className="right-section">
                                <p className="area">
                                    {this.state.timezone}
                                </p>
                                <Link style={{ background: 'transparent', border: 'none', color: 'white', marginTop: 6, textDecoration: 'none' }}
                                    to="/">
                                    <strong>&larr;Go to Search</strong>
                                </Link>
                            </div>
                        </div>

                        <div>

                        </div>
                        {this.state.daily.map((element) => {
                            return (
                                <div>
                                    <DailyWeather obj={element} setWeekDay={this.props.setWeekDay} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </>
        );
    }
}

export default TopSection;
