import React from 'react';
import {Alert} from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from "axios";
import Weather from './Weather';

const API_KEY = "";

export default class extends React.Component {
  state = { // State - setState Call Refresh DOM
    isLoading: true
  };
  getWeather = async(latitude, longitude) => {   // Weather API Call Return DATA 
    const {data: {main: {temp, temp_max, temp_min}, name, weather: [{id, icon}] }} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`);
    const exid = (id === 800 ? 1 : id / 100);
    
    this.setState({isLoading:false, temp:Math.round(temp), temp_max:Math.round(temp_max), temp_min:Math.round(temp_min), name, id:exid, icon});      
  };
  gioLocation = async() => { // Location API Call Return latitude, longitute
    try {
      await Location.requestPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() { //componentMount Call Location Get
    this.gioLocation();
  };
  render() { // Component Render
    const {isLoading, temp, temp_max, temp_min, id, icon, name} = this.state;
    const image_url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    // console.log(image_url);
    return (isLoading ? <Loading /> : <Weather temp={temp} id={id} icon={icon} image={image_url} tempMax={temp_max} tempMin={temp_min} name={name}/>);
  };
}
