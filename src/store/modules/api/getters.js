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
    isDataLoading: state => {
        return state.isDataLoading;
    },
    getVisualizations: state => {
        return state.visualizations.map(item => {
            return {
                ...item,
                isActive: item.id === state.activeVisualization
            };
        });
    },
    getPopupData: state => {
        return state.popupData;
    },
}