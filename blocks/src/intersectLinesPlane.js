'use strict';

import {intersectLinesPlane} from '../../src/reflection.js';

function run(lines, plane) {
    return {
        intersections: intersectLinesPlane(lines, plane)
    };
}

export {
    run: run
}