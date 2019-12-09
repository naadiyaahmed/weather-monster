import React from 'react';

import Weather from './app_components/weather.component';
import Searchbox from './app_components/searchbox.component';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import logo from '../src/images/logo.png';
import cityImg from '../src/images/add-city.png';

const API_KEY = "d2f6f863342fdd4f0f46de3b80f72860";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      response: undefined
    }
  }

  //list of cities that have been selected
  cityList = [];

  //Adding a city to the list
  addCityId = (cityid) => {
    if (this.cityList.indexOf(cityid) < 0) {
      this.cityList.push(cityid)
      this.getWeather(this.cityList.toString());
    }
  }

  //Removing a city from the list
  removeCityId = (cityid) => {
    if (this.cityList.indexOf(cityid) < 0) {
      var index = this.cityList.indexOf(cityid.toString());
      if (index > -1) {
        this.cityList.splice(index, 1);
      }
      if (this.cityList.length > 0) {
        this.getWeather(this.cityList.toString());
      } else {
        this.setState({
          response: undefined
        })
      }
    }
  }

  getWeather = async (cityid) => {
    //API call to open weather map
    try {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/group?id=${cityid}&appid=${API_KEY}`);
      const response = await api_call.json();
      console.log(response.list, 'response from weather')
      this.setState({
        response: response.list
      });
    } catch (error) {
      console.log(error);
    }

  }

  //Converting Kelvin Temp to Farenheit
  toFarenheit(val) {
    return Math.floor((val - 273.15) * (9 / 5) + 32);
  }


  //Rendering the cards with the weather data
  weatherRendering() {
    if (this.state.response) {
      const cards = [];
      let val = this.state.response;
      //sorting by max temp
      if (this.state.response.length > 1) {
        val.sort((a, b) => {
          return b.main.temp_max - a.main.temp_max
        })
      }
      //looping through the array
      for (let item = 0; item < val.length; item++) {
        cards.push(
          <a className="col-lg-4 col-md-12" key={val[item].id} onClick={() => { this.removeCityId(val[item].id) }}>
            <Weather
              key={val[item].name}
              city={val[item].name}
              country={val[item].sys.country}
              temp={this.toFarenheit(val[item].main.temp)}
              maxTemp={this.toFarenheit(val[item].main.temp_max)}
              minTemp={this.toFarenheit(val[item].main.temp_min)}
              description={val[item].weather[0].description}
              icon={'http://openweathermap.org/img/wn/' + val[item].weather[0].icon + '@2x.png'}
              cityid={val[item].id}
            /></a>
        );
      }
      return cards;
    } else {
      //When no city is selected
      return (
        <div className="default-text">
          <img src={cityImg} alt="add a city" />
          <h1>Add a city!</h1>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App main-body">
        <img src={logo} alt="logo" className="py-2 logo" />
        <h1 className="py-2">Weather Monster</h1>
        <Searchbox cityid={this.addCityId} />
        {/* Loop through weather cards here! */}
        <div className="py-2">
          <div className="card-group">
            {this.weatherRendering()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
