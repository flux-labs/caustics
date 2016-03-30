/**
 * Reflect a uniform sampling of rays off of a mesh onto a plane.
 *
 * @author Drew <drew@flux.io>
 * @version  0.0.1
 */

import matrix from 'gl-matrix';

var EPSILON = 0.0001;

export default function reflect (reflectiveMesh, incidentVector, groundPlane, sampleDistance) {
  var normal = matrix.vec3.normalize([], incidentVector);
  var skyPlane = findSkyPlane(mesh, normal);

  //TODO sample uniformly from sky plane and reflect off surface.

  return [];

}

export function findSkyPlane (mesh, incidentVector) {
  var i, vertex, maxX = 0, maxY = 0, maxZ = 0;

  for (i=0; i < mesh.vertices.length; i++) {
    vertex = mesh.vertices[i];
    maxX = Math.max(maxX, vertex[0]);
    maxY = Math.max(maxY, vertex[1]);
    maxZ = Math.max(maxZ, vertex[2]);
  }

  return {
    origin: [maxX, maxY, maxZ],
    normal: incidentVector,
    primitive: "plane"
  };
}


export function projectMeshOntoPlane (mesh, plane) {
  var projectedMesh = {
    primitive: "mesh"
  };

  // the faces are the same.
  projectedMesh.faces = JSON.parse(JSON.stringify(mesh.faces));

  // the verices need to be projected onto the plane.
  projectedMesh.vertices = [];

  for (var i = 0; i < mesh.vertices.length; i++) {
    projectedMesh.vertices.push(
      projectPointOntoPlane(
        mesh.vertices[i], plane
    ));
  }
  return projectedMesh;
}


export function projectPointOntoPlane (point, plane) {
  var diff = matrix.vec3.subtract([], point, plane.origin);
  var distanceToPlane = matrix.vec3.dot(diff, plane.normal);
  var scaled = matrix.vec3.scale([], plane.normal, distanceToPlane);
  var projectedPoint = matrix.vec3.subtract([], point, scaled);
  return projectedPoint;
}



export function intersectLinePlane(line, plane) {
  var p1 = plane.origin;

  var q1 = line.start;
  var q2 = line.end;

  var segment = matrix.vec3.subtract([], q1, q2);
  var e = matrix.vec3.normalize([], segment);

  var pq = matrix.vec3.subtract([], p1, q1);
  var dotSegmentNormal = matrix.vec3.dot(e, plane.normal);

  if ( dotSegmentNormal === 0 ) {
    // the line is parallel to the plane, there is no intersection.
    return null;
  }

  // We got here, so there is an intersection. Get two more points on the plane.
  var g = [0,0,1];
  var mag = matrix.vec3.len(matrix.vec3.cross([], g, plane.normal));
  if ( mag < EPSILON ) {
    g = [0,1,0];
  }
  var mag = matrix.vec3.len(matrix.vec3.cross([], g, plane.normal));
  if ( mag < EPSILON ) {
    g = [1,0,0];
  }

  var u = matrix.vec3.normalize( [], matrix.vec3.cross([], plane.normal, g));
  var v = matrix.vec3.cross([], u, plane.normal);
  var p2 = matrix.vec3.add([], p1, u);
  var p3 = matrix.vec3.add([], p1, v);

  // now find the intersection.

  var t = matrix.vec3.dot(pq, plane.normal) / matrix.vec3.dot(e, plane.normal);

  return matrix.vec3.add([], q1, matrix.vec3.scale([], e, t));
}

export function intersectLinesPlane(lines, plane) {
  var intersections = [];
  for (var i = 0; i < lines.length; i++) {
    intersections.push(intersectLinePlane(lines[i], plane));
  }
  return intersections;
}

function compareIndex(a, b, i) {
  if (a[i] < b[i]) {
    return -1;
  } else if (a[i] > b[i]) {
    return 1;
  }
  return 0;
}

function compareRadix(a,b) {
  for (var i=0; i< a.length; i++) {
    var result = compareIndex(a,b,i);
    if (result !==0) return result;
  }
  return 0;
}

export function findProximityScores(points, radius) {
  var proximities = [];

  // do the stupid thing
  var currentCount, firstPoint, secondPoint;

  for (var i=0; i<points.length; i++) {
    currentCount = 0;
    for (var j=0; j< points.length; j++) {
      firstPoint = points[i].point || points[i];
      secondPoint = points[j].point || points[j];
      if (i !== j && matrix.vec3.distance(firstPoint, secondPoint) < radius) {
        currentCount++;
      }
    }
    proximities[i] = currentCount;
  }

  return proximities;


}