import { covidapi } from './util/request';

const fetchLayers = () => {
    return covidapi.get(`/try`);
}

export { fetchLayers }