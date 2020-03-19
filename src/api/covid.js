import { covidapi } from './util/request';

const fetchLayers = () => {
    return covidapi.get(`/layers?ts=${new Date().getTime()}`);
}

const fetchGeoJSONLayer = () => {
    return covidapi.get(`/all?ts=${new Date().getTime()}`);
}

export { fetchLayers, fetchGeoJSONLayer }