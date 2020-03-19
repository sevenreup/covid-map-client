export default function init() {
    return {
        layers: {},
        layersById: [],
        activeLayer: null,
        scatterplotData: null,
        geojsonData: null,
        isLayersLoading: true,
        isDataLoading: false,
        activeVisualization: "geojson",
        visualizations: [
            {
                id: "scatterplot",
                name: "Scatterplot",
                icon: "bubble_chart",
            },
            {
                id: "geojson",
                name: "GeoJSON",
                icon: "streetview"
            }
        ],
        popupData: null
    }
}