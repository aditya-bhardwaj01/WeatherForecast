import React, { Component } from 'react'
import sunny from "./sunny.gif";
import partialCloudy from "./partial_cloudy.gif";
import cloudy from "./cloudy.gif";
import rainy from "./rainy.gif";
import "./Hour.css"

export class Hour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: "",
            humidity: "",
            cloud: "",
            windSpeed: "",
            dewPoint: "",
            windDegree: "",
            visibility: "",
            pressure: "",
            weather: "",
            feelsLike: ""
        }
    }

    getTimeInData = () => {
        var dateObj = new Date();
        const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var weekInd = dateObj.getUTCDay();
        var currentDay = week[weekInd];
        var objDay = window.moment(this.props.obj.dt * 1000).format('dddd');

        if (currentDay === objDay) {
            return 'Today ' + window.moment(this.props.obj.dt * 1000).format('HH:mm');
        }
        else {
            return objDay + ' ' + window.moment(this.props.obj.dt * 1000).format('HH:mm');
        }
    }

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

    updateHourlyForecast = () => {
        this.setState({
            temp: Math.ceil((parseInt(this.props.obj.temp) - 273.15).toFixed(2)),
            humidity: this.props.obj.humidity + '%',
            cloud: this.props.obj.clouds + '%',
            windSpeed: Math.ceil(this.props.obj.wind_speed * 6.6) + ' km/h',
            dewPoint: Math.ceil((parseInt(this.props.obj.dew_point) - 273.15).toFixed(2)),
            windDegree: this.props.obj.wind_deg,
            visibility: Math.ceil(this.props.obj.visibility / 1000) + ' km',
            pressure: this.props.obj.pressure + ' mb',
            weather: this.props.obj.weather[0].main + " (" + this.props.obj.weather[0].description[0].toUpperCase() + this.props.obj.weather[0].description.substring(1) + ")",
            feelsLike: Math.ceil((parseInt(this.props.obj.feels_like) - 273.15).toFixed(2))
        })
    }

    componentDidMount() {
        this.updateHourlyForecast();
    }

    render() {
        return (
            <div className='Hour'>
                <>
                    <div className='element'>
                        <section className='time-hourly'>
                            <h5>
                                *{this.getTimeInData()}
                                {this.displayWeather(parseInt(this.state.cloud))}
                            </h5>
                        </section>

                        <section className='details'>
                            <div className="row">
                                <div className="col-md components">
                                    <span className="section">Temperature: &nbsp;&nbsp;</span>
                                    {this.state.temp}&deg;C
                                    <hr style={{marginRight: 50}}/>
                                </div>
                                <div className="col-md components">
                                    <span className="section">Humidity: &nbsp;&nbsp;</span>
                                    {this.state.humidity}
                                    <hr style={{marginRight: 50}}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md components">
                                    <span className="section">Cloud: &nbsp;&nbsp;</span>
                                    {this.state.cloud}
                                    <hr style={{marginRight: 50}}/>

                                </div>
                                <div className="col-md components">
                                    <span className="section">Wind Speed: &nbsp;&nbsp;</span>
                                    {this.state.windSpeed}
                                    <hr style={{marginRight: 50}}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md components">
                                    <span className="section">Dew Point: &nbsp;&nbsp;</span>
                                    {this.state.dewPoint}&deg;C
                                    <hr style={{marginRight: 50}}/>

                                </div>
                                <div className="col-md components">
                                    <span className="section">Wind: &nbsp;&nbsp;</span>
                                    {this.props.getWindDegree(this.state.windDegree)}
                                    <hr style={{marginRight: 50}}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md components">
                                    <span className="section">Visibility: &nbsp;&nbsp;</span>
                                    {this.state.visibility}
                                    <hr style={{marginRight: 50}}/>
                                </div>
                                <div className="col-md components">
                                    <span className="section">Pressure: &nbsp;&nbsp;</span>
                                    {this.state.pressure}
                                    <hr style={{marginRight: 50}}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md components">
                                    <span className="section">Weather: &nbsp;&nbsp;</span>
                                    {this.state.weather}
                                </div>
                                <div className="col-md components">
                                    <span className="section">Feels Like: &nbsp;&nbsp;</span>
                                    {this.state.feelsLike}&#176;C
                                </div>
                            </div>

                        </section>

                    </div>
                </>
            </div>
        )
    }
}

export default Hour