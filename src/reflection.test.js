/**
 * Tests for reflection/projection (incl helper functions).
 *
 * @author Drew <drew@flux.io>
 * @version 0.0.1
 */

'use strict';

import test from 'tape';
import reflect from './reflection.js'
import {
  projectPointOntoPlane,
  projectMeshOntoPlane,
  intersectLinePlane
} from './reflection.js';
import proximityTestSuite from './proximity.test.js';

test('Light intensity simulations', _reflectionTestSuite);

test('Proximity detection', proximityTestSuite);

function _reflectionTestSuite (t) {

  t.equal(typeof reflect, 'function',
      'reflect should be a function.'
  );

  _testProjectPointPlane(t);
  _testProjectMeshPlane(t);
  _testIntersectLinePlane(t);

  t.end();
}

var planes = [
  {
    "normal": [ 0, 0, 1],
    "origin": [ 0, 0, 0],
    "primitive": "plane"
  },
  {
    "normal": [ 0, 1, 0],
    "origin": [ 0, 0, 0],
    "primitive": "plane"
  },
  {
    "normal": [ 1, 0, 0],
    "origin": [ 0, 0, 0],
    "primitive": "plane"
  },
  {
    "normal": [ 1, 0, 0],
    "origin": [ 1, 1, 1],
    "primitive": "plane"
  },
];

var points = [
  [1, 2, 3],
  [0, 0, 0],
];

var meshes = [
  {
    vertices: [],
    faces: [],
  },
  {
    vertices: [ [0,0,0], [1,1,1], [2,-1,3] ],
    faces: [ [0,1,2] ],
  },
  {
    vertices: [ [0,0,0], [1,1,1], [2,-1,3], [4,1,2] ],
    faces: [ [0,1,2] [1,2,3] ],
  },

];

var lines = [
  {
    start: [-1, -1, -1],
    end: [1, 1, 1]
  },
  {
    start: [3, 1, 1],
    end: [1, 1, 1]
  },
];

function _testProjectPointPlane(t) {

  var projections = [
    [
      [ 1, 2, 0 ], [ 0, 0, 0 ]
    ],
    [
      [ 1, 0, 3], [ 0, 0, 0 ]
    ],
    [
      [ 0, 2, 3 ], [ 0, 0, 0 ]
    ],
    [
      [ 1, 2, 3 ], [ 1, 0 ,0 ]
    ]
  ];

  var point, plane;

  for(var i = 0; i < planes.length; i++) {
    plane = planes[i];
    for (var j = 0; j < points.length; j++) {
      point = points[j];
      t.deepEqual(
        projectPointOntoPlane(point, plane),
        projections[i][j],
        'Projection of ' + JSON.stringify(point) + ' onto plane ' + JSON.stringify(plane) + ' should be ' + JSON.stringify(projections[i][j])
      );
    }
  }

}

function _testProjectMeshPlane(t) {
  var projections = [
    [
      {
        vertices: [],
        faces: [],
      },
      {
        vertices: [ [0,0,0], [1,1,0], [2,-1,0] ],
        faces: [ [0,1,2] ],
      },
      {
        vertices: [ [0,0,0], [1,1,0], [2,-1,0], [4,1,0] ],
        faces: [ [0,1,2] [1,2,3] ],
      },
    ],
    [
      {
        vertices: [],
        faces: [],
      },
      {
        vertices: [ [0,0,0], [1,0,1], [2,0,3] ],
        faces: [ [0,1,2] ],
      },
      {
        vertices: [ [0,0,0], [1,0,1], [2,0,3], [4,0,2] ],
        faces: [ [0,1,2] [1,2,3] ],
      },
    ],
    [
      {
        vertices: [],
        faces: [],
      },
      {
        vertices: [ [0,0,0], [0,1,1], [0,-1,3] ],
        faces: [ [0,1,2] ],
      },
      {
        vertices: [ [0,0,0], [0,1,1], [0,-1,3], [0,1,2] ],
        faces: [ [0,1,2] [1,2,3] ],
      },
    ],
    [
      {
        vertices: [],
        faces: [],
      },
      {
        vertices: [ [1,0,0], [1,1,1], [1,-1,3] ],
        faces: [ [0,1,2] ],
      },
      {
        vertices: [ [1,0,0], [1,1,1], [1,-1,3], [1,1,2] ],
        faces: [ [0,1,2] [1,2,3] ],
      },
    ]
  ];

  var mesh, plane, projected;

  for(var i = 0; i < planes.length; i++) {
    plane = planes[i];
    for (var j = 0; j < meshes.length; j++) {
      mesh = meshes[j];
      projected = projectMeshOntoPlane(mesh, plane);
      t.deepEqual(
        projected.vertices,
        projections[i][j].vertices,
        'Projection of ' + JSON.stringify(mesh) + ' onto plane ' + JSON.stringify(plane) + '.'
      );
    }
  }
}

function _testIntersectLinePlane(t) {
  var intersections = [
    [
      [0,0,0], null
    ],
    [
      [0,0,0], null
    ],
    [
      [0,0,0], [0,1,1]
    ],
    [
      [1,1,1], [1,1,1]
    ]
  ];

  var plane, line;

  for(var i = 0; i < planes.length; i++) {
    plane = planes[i];
    for (var j = 0; j < lines.length; j++) {
      line = lines[j];
      t.deepEqual(
        intersectLinePlane(line, plane),
        intersections[i][j],
        'Projection of ' + JSON.stringify(line) + ' onto plane ' + JSON.stringify(plane) + ' should be ' + JSON.stringify(intersections[i][j])
      );
    }
  }

}