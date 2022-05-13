import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class ExtraInfo extends Component {
    render() {
        return (
            <>
                <div className="extra-info" >
                    <div className="temperature d-flex justify-content-between">
                        <div>Temperature</div>
                        <div>{this.props.temp}&deg;C</div>
                    </div>

                    <div className="humidity d-flex justify-content-between">
                        <div>Humidity</div>
                        <div>{this.props.humidity}</div>
                    </div>

                    <div className="humidity d-flex justify-content-between">
                        <div>Cloud</div>
                        <div>{this.props.cloud}</div>
                    </div>

                    <div className="sunrise d-flex justify-content-between">
                        <div>Sunrise*</div>
                        <div>{this.props.sunrise}</div>
                    </div>

                    <div className="sunset d-flex justify-content-between">
                        <div>Sunset*</div>
                        <div>{this.props.sunset}</div>
                    </div>

                    <div className="more-detail d-flex justify-content-between">
                        <div></div>
                        <Link
                            style={{ background: 'transparent', border: 'none', color: 'white', marginTop: 6, textDecoration: 'none' }} to="detail">
                            <strong>More Details&rarr;</strong>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}

export default ExtraInfo