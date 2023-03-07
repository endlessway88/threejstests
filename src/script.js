import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { AxesHelper } from 'three'
import { ViewHelper } from './ViewHelper.js';
//import * as dat from 'dat.gui'


// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xff0000)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

const sceneHelpers = canvas.sceneHelpers;

const grid = new THREE.Group();
scene.add( grid );

const grid1 = new THREE.GridHelper( 30, 30, 0x888888 );
grid1.material.color.setHex( 0x888888 );
grid1.material.vertexColors = false;
grid.add( grid1 );

const grid2 = new THREE.GridHelper( 30, 6, 0x222222 );
grid2.material.color.setHex( 0x222222 );
grid2.material.vertexColors = false;
grid.add( grid2 );

// helper


// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor( 0x000000, 0);
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas ,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true



const helper = new ViewHelper(camera, renderer, controls);

scene.add(new AxesHelper(20));

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    renderer.clear();
    const elapsedTime = clock.getElapsedTime()

    window.requestAnimationFrame(tick)

    // Update objects
    controls.update()
    helper.update()
    // Update Orbital Controls



    // Render
    renderer.render(scene, camera)

    helper.render();


    // Call tick again on the next frame


}

tick()