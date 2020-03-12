import axios from 'axios';

const baseurl = process.env.VUE_APP_BASE_URL;

const covidapi = axios.create({
    baseURL: baseurl
});

export { covidapi };
