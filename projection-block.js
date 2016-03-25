'use strict';

var matrix = require('gl-matrix/gl-matrix');

function run(mesh, plane) {
    return {
        projection: projectMeshOntoPlane(mesh, plane)
    };
}

module.exports = {
    run: run
};

function projectMeshOntoPlane (mesh, plane) {
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

function projectPointOntoPlane (point, plane) {
  var diff = matrix.vec3.subtract([], point, plane.origin);
  var distanceToPlane = matrix.vec3.dot(diff, plane.normal);
  var scaled = matrix.vec3.scale([], plane.normal, distanceToPlane);
  var projectedPoint = matrix.vec3.subtract([], point, scaled);
  return projectedPoint;
}