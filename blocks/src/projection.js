'use strict';

import {projectMeshOntoPlane} from '../../src/reflection.js';

function run(mesh, plane) {
    return {
        projection: projectMeshOntoPlane(mesh, plane)
    };
}

export default {
  run: run
}