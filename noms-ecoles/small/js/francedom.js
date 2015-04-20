function franceDom() {
        var ε = 1e-6;

        function france(coordinates) {
                var x = coordinates[0], y = coordinates[1];

                point = null;

                france.areasValues.some(function(d) {
                        if (x > d.clip[0][0] && x < d.clip[1][0]
                         && y < d.clip[0][1] && y > d.clip[1][1]) {
                                point = d.projection(coordinates);
                                return point;
                        }
                });

                if (point === null) {
                        return france.areas.metropole.projection(coordinates);
                }

                return point;
        }

        france.areas = {};
        france.areasMap = d3.map();
        france.areasValues = [];
        
        france.defineAreas = function(showFrance) {
                france.areas = {
                        metropole: {
                                clip: [
                                        [- 6.50, 51.50],
                                        [+11.00, 40.70]
                                ],

                                scale: 1.09,
                                projection: d3.geo.conicConformal()
                                        .center([2.2, 46.87])
                                        .rotate([-5.5, 0, 1])
                                        .parallels([44, 49])
                        },
                        
                        guadeloupe: {
                                center: [-3.8, 46.2],
                                clip: [
                                        [-61.95,  16.60],
                                        [-60.86,  15.77]
                                ],

                                scale: 1.5,
                                projection: d3.geo.conicEqualArea()
                                        .rotate([61.5, 0])
                                        .center([0, 16.25])
                                        .parallels([8, 18])
                        },
                        martinique: {
                                center: [-3.1, 44.8],
                                clip: [
                                        [-61.40,  15.00],
                                        [-60.70,  14.30]
                                ],

                                scale: 1.5,
                                projection: d3.geo.conicEqualArea()
                                        .rotate([60.7, 0])
                                        .center([0, 14.45])
                                        .parallels([8, 18])
                        },
                        guyane: {
                                center: [-3.4, 43.9],
                                clip: [
                                        [-55.20,   6.10],
                                        [-51.00,   1.90]
                                ],

                                scale: 0.23,
                                projection: d3.geo.conicEqualArea()
                                        .rotate([53, 0])
                                        .center([0, 4])
                                        .parallels([0, 8])
                        },
                       reunion: {
                                center: [-3.1, 41.2],
                                clip: [
                                        [55.00, -20.60],
                                        [56.20, -21.60]
                                ],

                                scale: 1.0,
                                projection: d3.geo.conicEqualArea()
                                        .rotate([-55.5, 0])
                                        .center([0, -23])
                                        .parallels([-25, -35])
                        },
                        mayotte: {
                                center: [-3.3, 41.90],
                                clip: [
                                        [44.90, -12.50],
                                        [45.40, -13.10]
                                ],

                                scale: 2.5,
                                projection: d3.geo.conicEqualArea()
                                        .rotate([-45.1, 0])
                                        .center([0, -12.7])
                                        .parallels([-8, -18])
                        }
                };


                france.areasMap = d3.map(france.areas);
                france.areasValues = france.areasMap.values();
        };

        france.defineAreas(false);


        france.showFrance = function(showFrance) {
                var scale = france.scale();
                france.defineAreas(showFrance);
                france.scale(scale);

                return france;
        };

        france.scale = function(_) {
                if (!arguments.length) return france.areas.metropole.projection.scale();

                france.areasMap.forEach(function(i, d) {
                        d.projection.scale(_ * d.scale);
                });

                return france.translate(france.areas.metropole.projection.translate());
        };

        france.translate = function(_) {
                if (!arguments.length) return france.areas.metropole.projection.translate();
                var coordinates = _;
                france.areas.metropole.projection.translate(coordinates);

                france.areasMap.forEach(function(i, d) {
                        if (d.center) {
                                d.projection.translate(france.areas.metropole.projection(d.center));
                        }
                });

                return france;
        };

        return france.scale(3000);
};

d3.geo.franceDom = franceDom;