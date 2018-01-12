import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import WeatherTable from 'components/WeatherTable.jsx';
import {getGeoForecast,cancelGeoForecast} from 'api/open-weather-map.js';

import './weather.css';
import './GeoForecast.css'

export default class GeoForecast extends React.Component {
    static propTypes = {
        masking: React.PropTypes.bool,
        group: React.PropTypes.string,
        description: React.PropTypes.string,
        temp: React.PropTypes.number,
        unit: React.PropTypes.string
    };

    static getInitWeatherState() {
        return {
            city: 'na',
            code: -1,
            group: 'na',
            description: 'N/A',
            temp: NaN
        };
    }
    constructor(props) {
        super(props);

        this.state = {
            ...GeoForecast.getInitWeatherState(),
            data:'',
            loading: false,
            masking: false,
            modal: false,
            lat:24,
            lng:120,
            map:'',
            marker:'',
            infowindow:''
        };

       this.handleFormQuery = this.handleFormQuery.bind(this);
       this.placeMarker = this.placeMarker.bind(this);
       this.getposition = this.getposition.bind(this);
       this.toggle = this.toggle.bind(this);
       this.showmap = this.showmap.bind(this);
       this.maskInterval = null;
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() { 
        navigator.geolocation.getCurrentPosition(this.getposition);
        this.setState({
            modal: !this.state.modal
        });
    }

    getposition(position) {
        var lat=position.coords.latitude;
        var lng=position.coords.longitude;
        this.state.lat= lat.toFixed(4);
        this.state.lng= lng.toFixed(4);

        this.state.map = new google.maps.Map(this.refs.map, {
            center: {lat:lat,lng:lng},
            zoom: 16
        });
        this.state.marker = new google.maps.Marker({position:{lat:lat,lng:lng},
                                             animation:google.maps.Animation.BOUNCE
                                            });
        this.state.infowindow = new google.maps.InfoWindow({
            content: "Your Are Here!!!"
        });
        this.state.marker.setMap(this.state.map);
        this.state.infowindow.open(this.state.map,this.state.marker);
        google.maps.event.addListener(this.state.map, 'click',(event)=>this.placeMarker(event.latLng));
        this.getGeoForecast(this.props.city, this.props.unit, this.state.lat, this.state.lng,1);
    }

    placeMarker(latLng){
            var lat=latLng.lat();
            var lng=latLng.lng();
            this.setState({
            marker : new google.maps.Marker({position:latLng,
                       animation:google.maps.Animation.BOUNCE,
                       map:this.state.map
                      }),
            infowindow : new google.maps.InfoWindow({
                            content:'Latitude: ' + lat.toFixed(4) +
                                    '<br>Longitude: ' + lng.toFixed(4)
                          }) ,
            lat:  lat.toFixed(4),
            lng:  lng.toFixed(4),
            modal: !this.state.modal //show modal
            });
            console.log(latLng.lat());
            this.state.infowindow.open(this.state.map,this.state.marker); 
            this.getGeoForecast(this.props.city, this.props.unit, this.state.lat, this.state.lng,1);
    }

    componentWillUnmount() {
        if (this.state.loading) {
            cancelGeoForcast();
        }
    }

    render() {
        return (
            <div className={`forecast weather-bg ${this.state.group}`}>
                <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                    <div className={"map"} ref="map"></div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Forecast</ModalHeader>
                    <ModalBody>
                        <h3>Tomorrow</h3>
                        <WeatherDisplay {...this.state}/>
                        <WeatherTable {...this.state}/>
                        <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleFormQuery}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }

    getGeoForecast(city, unit, lat, lng, id) {
        this.setState({
            loading: true,
            masking: true,
            city: city,  //why this work?
            unit:this.notifyUnitChange(unit)
          //  city: city // set city state immediately to prevent input text (in WeatherForm) from blinking;
        }, () => { // called back after setState completes
            getGeoForecast(city, unit, lat, lng,id).then(geoforecast => {
                this.setState({
                    ...geoforecast,
                    loading: false
                }) , id?'':this.showmap();
            }).catch(err => {
                console.error('Error getting weather', err);

                this.setState({
                    ...GeoForecast.getInitWeatherState(unit),
                    loading: false
                });   //, () => this.notifyUnitChange(unit));
            });
        });

        this.maskInterval = setInterval(() => {
            clearInterval(this.maskInterval);
            this.setState({
                masking: false
            });
        }, 600);
    }

    handleFormQuery(city, unit) {
        this.getGeoForecast(city, unit, 0, 0, 0);
    }

    showmap(){
        this.state.map.setCenter({lat:this.state.lat,lng:this.state.lng});
        this.state.map.setZoom(16);
        this.state.marker = new google.maps.Marker({position:{lat:this.state.lat,lng:this.state.lng},
                                             animation:google.maps.Animation.BOUNCE
                                            });
        this.state.infowindow = new google.maps.InfoWindow({
            content: "City of Your Request!!!"
        });
        this.state.marker.setMap(this.state.map);
        this.state.infowindow.open(this.state.map,this.state.marker);
    }

    notifyUnitChange(unit) {
        if (this.props.units !== unit) {
            this.props.onUnitChange(unit);
        }
    }
}
