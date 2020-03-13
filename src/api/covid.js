import { covidapi } from './util/request';

const fetchLayers = () => {
    return covidapi.get(`/all`);
}

export { fetchLayers }