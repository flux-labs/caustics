'use strict';

import {translatePoints} from '../../src/reflection.js';

function run(points, vectors, scale) {
    return {
        translated: translatePoints(points, vectors, scale)
    };
}

export default {
  run: run
}