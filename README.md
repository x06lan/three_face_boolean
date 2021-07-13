# three js face boolean
main from CSG.js
add two function :
1. face_toCSG
2. CSG_toface
## require
[three.js](https://github.com/mrdoob/three.js)
## Usage

```js
import { CSG } from '../csg.js/csg.js'
import * as THREE from '../three.js/build/three.module.js';

let cube=new THREE.BoxGeometry(30, 30, 30)
let cube_face1=[]
let cube_face2=[]

cube.index.array.map(function (i) {
    let x = cube.attributes.position.array[i * 3]
    let y = cube.attributes.position.array[i * 3 + 1]
    let z = cube.attributes.position.array[i * 3 + 2]

    cube_face1.push(x, y, z)
    cube_face2.push(x + 10, y + 20, z + 10)
})

let CGSface1 = CSG.face_toCSG(cube_face1)
let CGSface2 = CSG.face_toCSG(cube_face2);
let CGSface3;
CGSface3 = CGSface1.intersect(CGSface2);
//  CGSface3 = CGSface1.union(CGSface2);
//  CGSface3 = CGSface1.subtract(CGSface2);
//  CGSface3 = CGSface2.subtract(CGSface1);

let face=CGS.CSG_toface(CGSface3); 

//face= [point1.x,point1.y,point1.z,
//       point2.x,point2.y,point2.z,
//       point3.x,point3.y,point3.z,.........]
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(face, 3));

let material = function (color) {
  return new THREE.MeshPhongMaterial({
    color: color,
    shininess: 0,
    specular: 0xffffff,
    flatShading: true,
    transparent: true,
  });
}
let three_mesh= new THREE.Mesh(geometry, material(0x00ff00));

``` 
