import { CSG } from '../csg.js/csg.js'
import * as THREE from '../three.js/build/three.module.js';
import Stats from '../three.js/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js';
// let 


const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
let stats = new Stats()
let contran = document.body


const animate = function () {
    requestAnimationFrame(animate);
    stats.begin();
    renderer.render(scene, camera);
    stats.end()
};
function init() {
    // scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    contran.appendChild(stats.dom)
    contran.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputEncoding = THREE.sRGBEncoding;
    // window.addEventListener('resize', onWindowResize);

    camera.position.x = 0
    camera.position.y = 100
    camera.position.z = 100

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 1.5;
    controls.minDistance = 1;
    controls.maxDistance = 5000;
    // renderer.shadowMap.enabled = true;
    createLights()
    // gyaction(new THREE.BoxGeometry(30, 30, 30))
    action()

    animate();


}
function action() {
    let cube = new THREE.BoxGeometry(30, 30, 30)
    let cube_face1 = []
    let cube_face2 = []

    cube.index.array.map(function (i) {
        let x = cube.attributes.position.array[i * 3]
        let y = cube.attributes.position.array[i * 3 + 1]
        let z = cube.attributes.position.array[i * 3 + 2]

        cube_face1.push(x, y, z)
        cube_face2.push(x + 5, y + 5, z + 5)

    })

    let CSGface1 = CSG.face_toCSG(cube_face1)
    let CSGface2 = CSG.face_toCSG(cube_face2);
    let CSGface3;
    // CSGface3 = CSGface1.intersect(CSGface2);
    //  CSGface3 = CSGface1.union(CSGface2);
     CSGface3 = CSGface1.subtract(CSGface2);
    //  CSGface3 = CSGface2.subtract(CSGface1);

    let face = CSG.CSG_toface(CSGface3);
    face = new Float32Array(face)

    //face= [point1.x,point1.y,point1.z,
    //       point2.x,point2.y,point2.z,
    //       point3.x,point3.y,point3.z,.........]
    console.log(face)
    let geometry = new THREE.BufferGeometry()
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
    let three_mesh = new THREE.Mesh(geometry, material(0x00ff00));
    let cube_mesh = new THREE.Mesh(cube, material(0xff0000));

    scene.add(three_mesh);
    // scene.add(cube_mesh)

}
function createLights() {

    let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1)

    let ambientLight = new THREE.AmbientLight(0xe9b2ff, 0.3);
    let shadowLight = new THREE.DirectionalLight(0xffffff, 0.5);
    let shadow = new THREE.DirectionalLight(0xffffff, 0.1);
    shadowLight.position.set(150, 100, 350);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.near = 0.1;
    shadowLight.shadow.camera.far = 1000;
    shadowLight.shadow.mapSize.width = 1024;
    shadowLight.shadow.mapSize.height = 1024;

    shadow.position.set(-150, -350, -350);
    shadow.castShadow = true;
    shadow.shadow.camera.near = 0.1;
    shadow.shadow.camera.far = 1000;
    shadow.shadow.mapSize.width = 1024;
    shadow.shadow.mapSize.height = 1024;

    const d = 300;

    shadowLight.shadow.camera.left = - d;
    shadowLight.shadow.camera.right = d;
    shadowLight.shadow.camera.top = d;
    shadowLight.shadow.camera.bottom = - d;

    var ch = new THREE.CameraHelper(shadowLight.shadow.camera);
    const gridHelper = new THREE.GridHelper(1000, 20);
    let lightProbe = new THREE.LightProbe();
    scene.add(lightProbe)
    // scene.add( new LightProbeHelper( lightProbe, 5 ) );
    // scene.add(gridHelper);
    // scene.add(new THREE.AxesHelper(100));
    // scene.add(hemisphereLight);  
    // scene.add(ch);
    scene.add(ambientLight);
    scene.add(shadowLight);
    scene.add(shadow);

}
init()


