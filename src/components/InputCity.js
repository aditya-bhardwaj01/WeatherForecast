import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "./InputCity.css"
import weather from "./weather.gif";

export class InputCity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: "",
            valid: false,
            lat: "",
            long: "",
            loading: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = async (event) => {
        await this.setState({ val: event.target.value });
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.val}&APPID=5538732fae3c139814b51fb860b1197b`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ loading: false });

        if (this.state.val == "" || parsedData.cod >= 400) {
            this.setState({ valid: false });
        }
        else {
            this.setState({ valid: true, lat: parsedData.coord.lat, long: parsedData.coord.lon });
        }
    }

    // handleClick = async () => {
    //     const val = document.querySelector('input').value;
    //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&APPID=5538732fae3c139814b51fb860b1197b`;

    //     let data = await fetch(url);
    //     let parsedData = await data.json();

    //     if (val == "" || parsedData.cod >= 400) {
    //         this.setState({ valid: false });
    //         window.alert("Enter a valid location!!");
    //     }
    //     else {
    //         this.setState({ valid: true });
    //         this.props.setLocation(parsedData.coord.lat, parsedData.coord.lon);
    //     }
    // }

    handleClick = () => {
        if (this.state.valid) {
            this.props.setLocation(this.state.val, this.state.lat, this.state.long);
        }
        else {
            if (this.state.loading) {
                window.alert("Still Searching!!");
            }
            else {
                window.alert("Enter a valid location!!");
            }
        }
        console.log(this.state.val);
    }

    render() {
        return (
            <>
                <div className='InputCity'>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Enter City, Country Ex: London, UK"
                            aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={this.handleChange} />
                        <div className="input-group-append">
                            {this.state.loading ?
                                <Link disabled={true} className="btn btn-outline-secondary" onClick={this.handleClick} to={this.state.valid ? '/home' : '/'} style={{ height: 40 }}>
                                    Searching...
                                </Link> :
                                <Link className="btn btn-outline-secondary" onClick={this.handleClick} to={this.state.valid ? '/home' : '/'} style={{ height: 40 }}>
                                    Go
                                </Link>}

                            {/* <Link className="btn btn-outline-secondary" onClick={this.handleClick} to={this.state.valid ? '/home' : '/'}>
                                Search
                            </Link> */}
                        </div>
                    </div>

                    <img src={weather} alt="loading" className="img-fluid greetpage-GIF"></img>
                </div>
            </>
        )
    }
}

export default InputCity;