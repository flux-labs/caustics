'use strict';

import {findProximityScores} from '../../src/reflection.js';

function run(points, radius) {
    return {
        scores: findProximityScores(points, radius)
    };
}

export default {
  run: run
}