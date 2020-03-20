export default {
    getLayers: state => {
        return state.layersById.map(layerId => ({
            ...state.layers[layerId],
            isActive: state.activeLayer === layerId
        }));
    },
    getActiveLayer: state => {
        return state.activeLayer;
    },
}