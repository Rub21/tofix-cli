module.exports = {
    tasks: [{
        name: "test-Broken polygons",
        description: "Unclosed ways which should be closed",
        file: "./data/unclosedways.geojson",
        changesetComment: "Fixing invalid multipolygon relation by closing unclosed rings and self intersecting areas using #to-fix https://github.com/mapbox/mapping/issues/206"
    }, {
        name: "test-Crossing major highways",
        description: "Detecting major highways which overlap with other major highways",
        file: "./data/crossinghighways-major.geojson",
        changesetComment: "Adding junction nodes or bridges to overlapping highways using #to-fix https://github.com/mapbox/mapping/issues/104"
    }, {
        name: "test-Crossing minor highways",
        description: "Major highways that overlap with other minor highways",
        file: "./data/crossinghighways-minor.geojson",
        changesetComment: "Adding junction nodes or bridges to overlapping highways using #to-fix https://github.com/mapbox/mapping/issues/104"
    }, {
        name: "test-Impossible one-ways major highways",
        description: "Impossible one ways for major highways",
        file: "./data/impossibleoneways-major.geojson",
        changesetComment: "Adding or deleting oneway=* tag to make the roads navigable using #to-fix https://github.com/mapbox/mapping/issues/205"
    }, {
        name: "test-Impossible one-ways minor highways",
        description: "Impossible one ways for minor highways",
        file: "./data/impossibleoneways-minor.geojson",
        changesetComment: "Adding or deleting oneway=* tag to make the roads navigable using #to-fix https://github.com/mapbox/mapping/issues/205"
    }, {
        name: "test-Invalid turn lanes",
        description: "Detecting invalid turn lanes",
        file: "./data/turnlanes.geojson",
        changesetComment: "Fixing incorrectly added turn-lanes using #to-fix https://github.com/mapbox/mapping/issues/193"
    }, {
        name: "test-Islands major highways",
        description: "Major highways which are islands, without any connection.",
        file: "./data/islandshighways-major.geojson",
        changesetComment: "Fixing highways which are islands by tracing or connecting them to another highway using #to-fix https://github.com/mapbox/mapping/issues/166"
    }, {
        name: "test-Islands minor highways",
        description: "Minor highways which are islands, without any connection.",
        file: "./data/islandshighways-minor.geojson",
        changesetComment: "Fixing highways which are islands by tracing or connecting them to another highway using #to-fix https://github.com/mapbox/mapping/issues/166"
    }, {
        name: "test-Kinks major highways",
        description: "Aligning roads that contains impossible angles",
        file: "./data/kinks-major.geojson",
        changesetComment: "Aligning and fixing impossible angles in highway using #to-fix https://github.com/mapbox/mapping/issues/107"
    }, {
        name: "test-Kinks minor highways",
        description: "Aligning roads that contains impossible angles",
        file: "./data/kinks-minor.geojson",
        changesetComment: "Aligning and fixing impossible angles in highway using #to-fix https://github.com/mapbox/mapping/issues/107"
    }, {
        name: "test-Missing oneway - motorway_link",
        description: "Detecting motorway links without oneway tag , which is connected to a highway=motorway with a oneway.",
        file: "./data/missingoneways.geojson",
        changesetComment: "Adding missing oneway tag to motorway_links using #to-fix https://github.com/mapbox/mapping/issues/204"
    }, {
        name: "test-Mixed layers major highways",
        description: "Task which detects ways which are intersecting in a node and they have a tag with different layers",
        file: "./data/mixedlayer-major.geojson",
        changesetComment: "Fixing invalid layer tag in intersected highways using #to-fix https://github.com/mapbox/mapping/issues/202"
    }, {
        name: "test-Mixed layers minor highways",
        description: "Task which detects ways which are intersecting in a node and they have a tag with different layers",
        file: "./data/mixedlayer-minor.geojson",
        changesetComment: "Fixing invalid layer tag in intersected highways using #to-fix https://github.com/mapbox/mapping/issues/202"
    }, {
        name: "test-Overlapping major highways",
        description: "Detecting major roads which overlap other major highways.",
        file: "./data/overlaphighways-major.geojson",
        changesetComment: "Deleting overlapped highways using #to-fix https://github.com/mapbox/mapping/issues/167"
    }, {
        name: "test-Overlapping minor highways",
        description: "Detecting minor roads which overlap other minor highways.",
        file: "./data/overlaphighways-minor.geojson",
        changesetComment: "Deleting overlapped highways using #to-fix https://github.com/mapbox/mapping/issues/167"
    }, {
        name: "test-Self intersecting minor highways",
        description: "Minor highways which are intersecting by itself",
        file: "./data/selfintersectinghighways-minor.geojson",
        changesetComment: "Splitting self-intersecting highways using #to-fix https://github.com/mapbox/mapping/issues/203"
    }, {
        name: "test-Strange layer",
        description: "Bridges with a negative layer tag and tunnels with postive layer tag.",
        file: "./data/strangelayer-layer.geojson",
        changesetComment: "Fixing incorrectly added layer tag to bridges and tunnels using #to-fix https://github.com/mapbox/mapping/issues/210"
    }, {
        name: "test-Unconnected minor highways",
        description: "Minor highways which are disconnected with other highways.",
        file: "./data/unconnectedhighways-minor.geojson",
        changesetComment: "Connecting motorable roads using #to-fix https://github.com/mapbox/mapping/issues/105"
    }, {
        name: "test-Self intersecting major highways",
        description: "Major highways which are intersecting by itself.",
        file: "./data/selfintersectinghighways-major.geojson",
        changesetComment: "Splitting self-intersecting highways using #to-fix https://github.com/mapbox/mapping/issues/203"
    }, {
        name: "test-Unconnected major highways",
        description: "Major highways which are disconnected with other highways",
        file: "./data/unconnectedhighways-major.geojson",
        changesetComment: "Connecting motorable roads using #to-fix https://github.com/mapbox/mapping/issues/105"
    }]
};