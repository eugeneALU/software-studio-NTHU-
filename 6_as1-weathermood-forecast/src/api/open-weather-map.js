import axios from 'axios';

// TODO replace the key with yours
const key = '688b67cffcbd2668d454c4edfd3d4582';
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${key}`;
const baseUrlForecast = `http://api.openweathermap.org/data/2.5/forecast/daily?appid=${key}&cnt=6`;

export function getWeatherGroup(code) {
    let group = 'na';
    if (200 <= code && code < 300) {
        group = 'thunderstorm';
    } else if (300 <= code && code < 400) {
        group = 'drizzle';
    } else if (500 <= code && code < 600) {
        group = 'rain';
    } else if (600 <= code && code < 700) {
        group = 'snow';
    } else if (700 <= code && code < 800) {
        group = 'atmosphere';
    } else if (800 === code) {
        group = 'clear';
    } else if (801 <= code && code < 900) {
        group = 'clouds';
    }
    return group;
}

export function capitalize(string) {
    return string.replace(/\b\w/g, l => l.toUpperCase());
}

let weatherSource = axios.CancelToken.source();

export function getWeather(city, unit) {
    var url = `${baseUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url, {cancelToken: weatherSource.token}).then(function(res) { //res : return json data 
        if (res.data.cod && res.data.message) {
            throw new Error(res.data.message);
        } else {
            return {
                city: capitalize(city),
                code: res.data.weather[0].id,
                group: getWeatherGroup(res.data.weather[0].id),
                description: res.data.weather[0].description,
                temp: res.data.main.temp,
                unit: unit // or 'imperial'
            };
        }
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

let forecast = axios.CancelToken.source();

export function getForecast(city, unit) {
    var url = `${baseUrlForecast}&q=${encodeURIComponent(city)}&units=${unit}`;
 
    console.log(`Making request to: ${url}`);
    return axios.get(url, {cancelToken: forecast.token}).then(function(res) { //res : return json data 
      /* if (res.data.cod && res.data.message) {
            throw new Error(res.data.message);
        } else */
        {
            return {
                city: capitalize(city),
                code: res.data.list[1].weather[0].id,
                group: getWeatherGroup(res.data.list[1].weather[0].id),
                description: res.data.list[1].weather[0].description,
                temp: res.data.list[1].temp.day,
                unit: unit,// or 'imperial',
                data:res.data.list
            };
        }
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

let geoforecast = axios.CancelToken.source();

export function getGeoForecast(city, unit, lat , lng,id) {
    if(id===1){
        var url = `${baseUrlForecast}&lat=${lat}&lon=${lng}&units=${unit}`;
    }
    else {
        var url = `${baseUrlForecast}&q=${encodeURIComponent(city)}&units=${unit}`;
    }
    console.log(`Making request to: ${url}`);
    return axios.get(url, {cancelToken: geoforecast.token}).then(function(res) { //res : return json data 
      /* if (res.data.cod && res.data.message) {
            throw new Error(res.data.message);
        } else */
        {
            return {
                city: res.data.city.name,
                code: res.data.list[1].weather[0].id,
                group: getWeatherGroup(res.data.list[1].weather[0].id),
                description: res.data.list[1].weather[0].description,
                temp: res.data.list[1].temp.day,
                unit: unit,// or 'imperial',
                data:res.data.list,
                lat:res.data.city.coord.lat,
                lng:res.data.city.coord.lon
            };
        }
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelWeather() {
    weatherSource.cancel('Request canceled');
}

export function cancelForecast() {
    forecast.cancel('Request canceled');
}

export function cancelGeoForecast() {
    geoforecast.cancel('Request canceled');
}
