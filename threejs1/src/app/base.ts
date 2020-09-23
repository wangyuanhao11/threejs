import {
    Scene,
    AmbientLight,
    PointLight,
    WebGLRenderer,
    PerspectiveCamera,
    GridHelper,
    Color,
    WebGLShadowMap
} from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import * as THREE from 'three';
import * as Stats from 'stats.js';

import * as AnaglyphEffectJs from 'three-full';
import { AnaglyphEffect } from 'three-full';

export let container, camera, scene, renderer, effect;

export let spheres = [];

export let mouseX = 0;
export let mouseY = 0;

export let windowHalfX = window.innerWidth / 2;
export let windowHalfY = window.innerHeight / 2;


export function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.z = 3;
    camera.focalLength = 3;

    let path = "assets/pisa/";
    let format = '.png';
    let urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];

    let textureCube = new THREE.CubeTextureLoader().load(urls);

    console.log(textureCube);
    scene = new THREE.Scene();
    scene.background = textureCube;

    let geometry = new THREE.SphereBufferGeometry(0.1, 32, 16);
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube });

    for (let i = 0; i < 500; i++) {

        let mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = Math.random() * 10 - 5;
        mesh.position.y = Math.random() * 10 - 5;
        mesh.position.z = Math.random() * 10 - 5;

        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

        scene.add(mesh);

        spheres.push(mesh);

    }

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    let width = window.innerWidth || 2;
    let height = window.innerHeight || 2;

    effect = new AnaglyphEffectJs.AnaglyphEffect(renderer);
    effect.setSize(width, height);

    //

    window.addEventListener('resize', onWindowResize, false);

}

export function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    effect.setSize(window.innerWidth, window.innerHeight);

}

export function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;

}

//

export function animate() {

    requestAnimationFrame(animate);

    render();

}

export function render() {

    let timer = 0.0001 * Date.now();

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (- mouseY - camera.position.y) * .05;

    camera.lookAt(scene.position);

    for (let i = 0, il = spheres.length; i < il; i++) {

        let sphere = spheres[i];

        sphere.position.x = 5 * Math.cos(timer + i);
        sphere.position.y = 5 * Math.sin(timer + i * 1.1);

    }

    effect.render(scene, camera);

}