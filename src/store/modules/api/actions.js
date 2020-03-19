import { types } from './util/constants';

import { fetchLayers, fetchGeoJSONLayer } from '../../../api/covid';
import { GeoJsonLayer } from '@deck.gl/layers';
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
    getActiveGeoLayer: async ({ state, commit }) => {
        if (state.activeVisualization === "scatterplot") {
            console.log('stuff');

        } else {
            console.log('geo start, ' + state.activeLayer + ", " + state.geojsonData);

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
    }
}

function getRangeIndex(range, item) {
    for (let i = 0; i < range.length - 1; i++) {
        if (item >= range[i] && item <= range[i + 1]) {
            return i;
        }
    }
}