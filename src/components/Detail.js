import React, { Component } from "react";
import Hour from "./Hour";
import "./Detail.css"
import { Link } from 'react-router-dom'
import Spinner from "./Spinner";

export class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hourly: [],
            loading: false
        }
    }

    getWindDegree = (angle) => {
        // N 348.75 - 11.25
        // NNE 11.25 - 33.75
        // NE 33.75 - 56.25
        // ENE 56.25 - 78.75
        // E 78.75 - 101.25
        // ESE 101.25 - 123.75 
        // SE 123.75 - 146.25 
        // SSE 146.25 - 168.75

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
        // S 168.75 - 191.25
        // SSW 191.25 - 213.75 
        // SW 213.75 - 236.25 
        // WSW 236.25 - 258.75 
        // W 258.75 - 281.25
        // WNW 281.25 - 303.75
        // NW 303.75 - 326.25
        // NNW 326.25 - 348.75
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

    updateWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.props.latitude}&lon=${this.props.longitude}&exclude=minutely,daily&appid=5538732fae3c139814b51fb860b1197b`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            hourly: parsedData.hourly.slice(1),
            loading: false,
            dewPoint: Math.ceil((parseInt(parsedData.current.dew_point) - 273.15).toFixed(2)),
            windDegree: parsedData.current.wind_deg,
            visibility: Math.ceil(Math.ceil(parsedData.current.visibility) / 1000),
            pressure: parsedData.current.pressure + ' mb',
            weather: parsedData.current.weather[0].main + " (" + parsedData.current.weather[0].description[0].toUpperCase() + parsedData.current.weather[0].description.substring(1) + ")",
            feelsLike: Math.ceil((parseInt(parsedData.current.feels_like) - 273.15).toFixed(2))
        })
    }

    componentDidMount() {
        this.updateWeather();
    }
    render() {
        return <>
            {this.state.loading ? <Spinner /> : <div className="Detail" style={{ color: 'white' }}>
                <Link className="gotoDetailTop gotoDetail" to="/home">
                    <strong>&larr;Go back</strong>
                </Link>
                <br />
                <i className="time-zone"><strong>*In accordance with your time zone</strong></i>
                <div className="container">
                    <div className="current">
                        <h5>
                            CURRENT
                        </h5>
                        <div className="row">
                            <div className="col-md components">
                                <span className="section">Dew Point: &nbsp;&nbsp;</span>
                                {this.state.dewPoint}&#176;C
                                <hr style={{marginRight: 50}}/>
                            </div>
                            <div className="col-md components">
                                <span className="section">Wind: &nbsp;&nbsp;</span>
                                {this.getWindDegree(this.state.windDegree)}
                                <hr style={{marginRight: 50}}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md components">
                                <span className="section">Visibility: &nbsp;&nbsp;</span>
                                {this.state.visibility} km
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
                    </div>

                    {this.state.hourly.map((element) => {
                        return <div>
                            <Hour obj={element} getWindDegree={this.getWindDegree} />
                        </div>
                    })}
                </div>

                <i className="time-zone"><strong>*In accordance with your time zone</strong></i>
                <br />
                <Link className="gotoDetailBottom gotoDetail" to="/home">
                    <strong>&larr;Go back</strong>
                </Link>
            </div>}
        </>;
    }
}

export default Detail;
