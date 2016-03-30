/**
 * Tests for proximity detection functions
 *
 * @author Drew <drew@flux.io>
 * @version  0.0.1
 */

'use strict';

import {findProximityScores} from './reflection.js';

export default function proximityTestSuite(t) {
  _testProximityScore(t);

  t.end();
}

var pointsArrays = [
  [ [ 0, 0, 0 ], [ 1, 1, 1 ], [ 0, 0, 0.9 ] ],
  [ [0,0,0], [1,0,0], [1,1,0], [1,1,1], [5,5,5], [ 9, 9, 9 ] ]
];

var radii = [0, 1, 2, 10];

var proximityScores = [
  [ [ 0, 0, 0 ], [ 1, 0, 1 ], [ 2, 2, 2 ], [ 2, 2, 2 ] ],
  [ [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ], [ 3, 3, 3, 3, 0, 0 ], [ 4, 4, 4, 4, 5, 1 ] ]
];

function _testProximityScore(t) {
  var points, radius;
  for (var i=0; i<pointsArrays.length; i++) {
    points = pointsArrays[i];
    for (var j=0; j<radii.length; j++) {
      radius = radii[j];
      t.deepEqual(findProximityScores(points, radius),
        proximityScores[i][j],
        'Scores for ' + JSON.stringify(points) + ' at radius ' + radius + ' should be ' + JSON.stringify(proximityScores[i][j]));
    }
  }
}