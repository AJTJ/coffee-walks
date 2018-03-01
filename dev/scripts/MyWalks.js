import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Qs from 'qs';

class MyWalks extends React.Component {
    constructor() {
        super();
        this.state = {
            lat: "",
            lng: "",
            location: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.nearbySearch = this.nearbySearch.bind(this);
    }
  
    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }
  
    setLocation(e) {
        e.preventDefault();
        console.log("set location")
        axios({
            method:'GET',
            url: 'http://proxy.hackeryou.com',
            dataResponse:'json',
            paramsSerializer: function(params) {
                return Qs.stringify(params, {arrayFormat: 'brackets'})
            },
            params: {
                reqUrl: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
                params: {
                    key: "AIzaSyCqAPO1t-7KMYt8f0YU2Pi4z2j-SWPvykg",
                    query: this.state.location
                }, 
                proxyHeaders: {
                    'header_params': 'value'
                },
                xmlToJSON: false
            }
        }).then(({data}) => {
            console.log(data);
            this.setState({ lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },() => this.nearbySearch());
        });
    }
  
    nearbySearch() {
        console.log("nearby search")
        console.log(this.state.lat, this.state.lng)
        axios({
            method:'GET',
            url: 'http://proxy.hackeryou.com',
            dataResponse:'json',
            paramsSerializer: function(params) {
                return Qs.stringify(params, {arrayFormat: 'brackets'})
            },
            params: {
                reqUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
                params: {
                    key: "AIzaSyCqAPO1t-7KMYt8f0YU2Pi4z2j-SWPvykg",
                    location: `${this.state.lat},${this.state.lng}`,
                    radius: 5000,
                    type: "cafe"
                }, 
                proxyHeaders: {
                    'header_params': 'value'
                },
                xmlToJSON: false
            }
            }).then((res) => {
                console.log(res);
            });
    }  
      
    componentDidMount() {
  
          
    }
    
    render() {
        return (
            <div>
                <form action="" onSubmit={this.setLocation}>
                    <input type="text" value={this.state.location} onChange={this.handleChange} id="location"/>
                    <input type="submit" value="coffee time-"/>
                </form>
            </div>
        )
      }
  }

  export default MyWalks;