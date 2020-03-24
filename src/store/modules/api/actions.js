import { types } from './util/constants';

import { fetchLayers, fetchGeoJSONLayer, fetchScatterLayer } from '../../../api/covid';
import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers';
// import { MapboxLayer } from '@deck.gl/mapbox';
import chroma, { scale, limits } from 'chroma-js';

export default {
    fetchLayers: async ({ commit }) => {
        try {
            commit(types.SET_LAYER_LOADING, true);
            const response = await fetchLayers();
            const { status, data } = response;
            if (status == 200 && data) {
                let layers = data.reduce((result, item) => {
                    return Object.assign(result, {
                        [item.id]: {
                            ...item
                        }
                    });
                }, {});
                commit(types.SET_LAYERS, layers);
                commit(types.SET_LAYER_LOADING, false);
            }
        } catch (err) {
            commit(types.SET_LAYER_LOADING, false);
            console.error(err);
            console.error('failed to load');
        }
    },
    fetchGeoJson: async ({ commit }) => {
        try {
            const response = await fetchGeoJSONLayer();
            const { status, data } = response;
            if (status === 200 && data) {
                const colors = scale(["#f7da8f", "#fc0339"])
                    .mode("lch")
                    .colors(10)
                    .map(item => chroma(item).rgb());
                const numbers = data.features.reduce((result, { properties: item }) => {
                    result.confirmed.push(item.data.confirmed);
                    result.deaths.push(item.data.deaths);
                    result.recovered.push(item.data.recovered);
                    return result;
                }, { confirmed: [], deaths: [], recovered: [] })

                const confirmedBuckets = limits(numbers.confirmed.filter(item => item !== 0), "l", 10);
                const deathsBuckets = limits(numbers.deaths.filter(item => item !== 0), "l", 10);
                const recoveredBuckets = limits(numbers.recovered.filter(item => item !== 0), "l", 10);

                const coloredData = data.features.map(item => {
                    return {
                        ...item,
                        properties: {
                            ...item.properties,
                            colors: {
                                confirmed:
                                    colors[
                                    getRangeIndex(
                                        confirmedBuckets,
                                        item.properties.data.confirmed
                                    )
                                    ],
                                deaths:
                                    colors[
                                    getRangeIndex(deathsBuckets, item.properties.data.deaths)
                                    ],
                                recovered:
                                    colors[
                                    getRangeIndex(
                                        recoveredBuckets,
                                        item.properties.data.recovered
                                    )
                                    ]
                            }
                        }
                    };
                });
                commit(types.SET_GEO_JSON_DATA, coloredData);
            }
        } catch (error) {
            console.error(error);
        }
    },
    fetchScatterplot: async ({ commit }) => {
        try {
            const response = await fetchScatterLayer();
            const { status, data } = response;
            if (status === 200 && data) {
                console.log(data);

                const colors = scale(["#fcba03", "#fc0339"])
                    .mode("lch")
                    .colors(10)
                    .map(item => chroma(item).rgb());
                const numbers = data.reduce(
                    (result, item) => {
                        result.confirmed.push(item.data.confirmed);
                        result.deaths.push(item.data.deaths);
                        result.recovered.push(item.data.recovered);
                        return result;
                    },
                    { confirmed: [], deaths: [], recovered: [] }
                );

                const confirmedBuckets = limits(numbers.confirmed.filter(item => item !== 0), "l", 10);
                const deathsBuckets = limits(numbers.deaths.filter(item => item !== 0), "l", 10);
                const recoveredBuckets = limits(numbers.recovered.filter(item => item !== 0), "l", 10);

                const coloredData = data.map(item => {
                    return {
                        ...item,
                        colors: {
                            confirmed:
                                colors[getRangeIndex(confirmedBuckets, item.data.confirmed)],
                            deaths: colors[getRangeIndex(deathsBuckets, item.data.deaths)],
                            recovered:
                                colors[getRangeIndex(recoveredBuckets, item.data.recovered)]
                        }
                    };
                });
                console.log('done ');

                commit(types.SET_SCATTER_PLOT_DATA, coloredData);
            }
        }
        catch (error) {
            console.log(error);

        }
    },
    setActiveLayer: async ({ state, commit }, layerID) => {
        console.log(layerID);
        if (state.activeLayer !== layerID) {
            commit(types.SET_ACTIVE_LAYER, layerID)
        } else {
            return;
        }
    },
    // Layers
    getActiveGeoLayer: async ({ state, commit }) => {
        if (state.activeVisualization === "scatterplot") {
            if (
                state.activeLayer &&
                state.scatterplotData &&
                state.scatterplotData.length > 0
            ) {
                return new ScatterplotLayer({
                    id: `${state.activeLayer}_scatter`,
                    data: state.scatterplotData,
                    pickable: true,
                    opacity: 0.8,
                    stroked: false,
                    filled: true,
                    radiusScale: 6,
                    radiusMinPixels: 5,
                    radiusMaxPixels: 30,
                    lineWidthMinPixels: 1,
                    getPosition: d => d.location.map(item => parseFloat(item)),
                    getRadius: d => d.data[state.activeLayer] * 50,
                    getFillColor: d => {
                        if (d.data[state.activeLayer]) return d.colors[state.activeLayer];
                        else return [0, 0, 0, 0];
                    },
                    onHover: (info, event) => {
                        if (info.object) {
                            const rootElement = event.rootElement;
                            const { offsetWidth, offsetHeight } = rootElement;
                            const { object, x, y } = info;
                            let itemX, itemY;

                            if (offsetWidth - x < 300) {
                                itemX = offsetWidth - 300;
                            } else {
                                itemX = x;
                            }

                            if (offsetHeight - y < 300) {
                                itemY = offsetHeight - (250 + (offsetHeight - y));
                            } else {
                                itemY = y;
                            }

                            commit(types.SET_POPUP_DATA, {
                                title: object.province || object.country,
                                description: `${object.country_code} ${object.country}`,
                                ...object.data,
                                x: itemX,
                                y: itemY,
                                show: true
                            });
                        } else {
                            commit(types.SET_POPUP_DATA, { show: false });
                        }
                    }
                });
            }
        } else {

            if (state.activeLayer && state.geojsonData) {
                console.log('geo inside');
                return new GeoJsonLayer({
                    id: `${state.activeLayer}_geojson`,
                    data: state.geojsonData,
                    dataTransform: data => {
                        console.log(data);
                        return data;
                    },
                    pickable: true,
                    stroked: false,
                    filled: true,
                    getFillColor: d => {
                        if (d.properties.data[state.activeLayer] !== 0) {
                            return d.properties.colors[state.activeLayer];
                        } else {
                            return [0, 0, 0, 0];
                        }
                    },
                    onHover: (info, event) => {
                        if (info.object) {
                            const rootElement = event.rootElement;
                            const { offsetWidth, offsetHeight } = rootElement;
                            const { object, x, y } = info;
                            let itemX, itemY;

                            if (offsetWidth - x < 300) {
                                itemX = offsetWidth - 300;
                            } else {
                                itemX = x;
                            }

                            if (offsetHeight - y < 300) {
                                itemY = offsetHeight - (250 + (offsetHeight - y));
                            } else {
                                itemY = y;
                            }

                            commit(types.SET_POPUP_DATA, {
                                title: object.properties.name,
                                description: object.id,
                                ...object.properties.data,
                                x: itemX,
                                y: itemY,
                                show: true
                            });
                        } else {
                            commit(types.SET_POPUP_DATA, { show: false });
                        }
                    }
                });
            }
        }
    },
    getScatterLayer: async ({ commit }) => {
        try {
            const response = await fetchScatterLayer();
            const { status, data } = response;

            if (status === 200 && data) {
                const colors = scale(["#fcba03", "#fc0339"]).mode("lch")
                    .colors(10)
                    .map(item => chroma(item).rgb());
                const numbers = data.reduce(
                    (result, item) => {
                        result.confirmed.push(item.data.confirmed);
                        result.deaths.push(item.data.deaths);
                        result.recovered.push(item.data.recovered);
                        return result;
                    },
                    { confirmed: [], deaths: [], recovered: [] }
                );
                const confirmedBuckets = limits(numbers.confirmed.filter(item => item !== 0), "l", 10);
                const deathsBuckets = limits(numbers.deaths.filter(item => item !== 0), "l", 10);
                const recoveredBuckets = limits(numbers.recovered.filter(item => item !== 0), "l", 10);

                const coloredData = data.map(item => {
                    return {
                        ...item,
                        colors: {
                            confirmed:
                                colors[getRangeIndex(confirmedBuckets, item.data.confirmed)],
                            deaths: colors[getRangeIndex(deathsBuckets, item.data.deaths)],
                            recovered:
                                colors[getRangeIndex(recoveredBuckets, item.data.recovered)]
                        }
                    };
                });
                commit(types.SET_SCATTER_PLOT_DATA, coloredData);
            }
        } catch (error) {
            console.log(error);
        }
    },
    setActiveVisualization: async ({ commit }, visualization) => {
        commit(types.SET_ACTIVE_VISUALIZATION, visualization);
    },
}

function getRangeIndex(range, item) {
    for (let i = 0; i < range.length - 1; i++) {
        if (item >= range[i] && item <= range[i + 1]) {
            return i;
        }
    }
}