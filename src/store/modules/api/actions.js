import { types } from './util/constants';

import { fetchLayers } from '../../../api/covid';

export default {
    fetchLayers: async ({ commit }) => {
        try {
            commit(types.SET_LAYER_LOADING, true);
            const response = await fetchLayers();
            const { status, data } = response;
            if (status == 200 && data) {
                commit(types.SET_LAYERS, data);
                commit(types.SET_LAYER_LOADING, false);
            }
        } catch (err) {
            commit(types.SET_LAYER_LOADING, false);
            console.error(err);
        }
    }
}