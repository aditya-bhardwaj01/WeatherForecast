import React, { Component } from 'react'
import "./App.css"
import TopSection from './components/TopSection'
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import Detail from './components/Detail';
import InputCity from './components/InputCity';
import DailyDetail from './components/DailyDetail';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: JSON.parse(window.localStorage.getItem('city')),
      latitude: JSON.parse(window.localStorage.getItem('latitude')),
      longitude: JSON.parse(window.localStorage.getItem('longitude')),
      dayOfWeek: JSON.parse(window.localStorage.getItem('dayOfWeek'))
    };
  }

  setWeekDay = async (day) => {
    window.localStorage.setItem('dayOfWeek', JSON.stringify(day))
    // console.log(this.state.day) 
    await this.setState({
      dayOfWeek: day
    });
  }

  setLocation = (val, lat, long) => {
    window.localStorage.setItem('city', JSON.stringify(val))
    window.localStorage.setItem('longitude', JSON.stringify(long))
    window.localStorage.setItem('latitude', JSON.stringify(lat))
    this.setState({
      city: val,
      latitude: lat,
      longitude: long
    });
  }

  render() {
    return (
      <div className='weatherApp'>
        <Router>
          <Switch>
            <Route exact path="/"><InputCity setLocation={this.setLocation} /></Route>
            <Route exact path="/home"><TopSection latitude={this.state.latitude} longitude={this.state.longitude} setWeekDay={this.setWeekDay} city={this.state.city} /></Route>
            <Route exact path="/detail"><Detail latitude={this.state.latitude} longitude={this.state.longitude} /></Route>
            <Route exact path="/dailyDetail"><DailyDetail latitude={this.state.latitude} longitude={this.state.longitude} weekDay={this.state.dayOfWeek}/></Route>
          </Switch>
        </Router>

        {/* <footer className="footer">
          <div>
            <p className="text-col">Copyright © 2022 | Designed & Developed by Aditya</p>
          </div>
        </footer> */}
      </div>
    )
  }
}

