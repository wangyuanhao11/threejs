import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as AnaglyphEffectJs from 'three-full';
import { PerspectiveCamera, CubeTextureLoader, Scene, SphereBufferGeometry, MeshBasicMaterial, Mesh, WebGLRenderer, BoxGeometry, DoubleSide } from 'three';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { Observable, fromEvent } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'threejs1';
  mouseX = 0;
  mouseY = 0;
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
  //effect = new AnaglyphEffect.AnaglyphEffect(this.renderer);


  path = "assets/pisa/";
  format = '.png';
  urls = [
    this.path + 'px' + this.format, this.path + 'nx' + this.format,
    this.path + 'py' + this.format, this.path + 'ny' + this.format,
    this.path + 'pz' + this.format, this.path + 'nz' + this.format
  ];

  spheres = [];
  scene = new Scene();

  width = window.innerWidth || 2;
  height = window.innerHeight || 2;

  geometry = new SphereBufferGeometry(0.1, 32, 16);
  material = new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide,transparent:true });
  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  effect = new AnaglyphEffectJs.AnaglyphEffect(this.renderer);

  textureCube = new CubeTextureLoader().load(this.urls,);
  //canvas: HTMLElement;

  move?: Observable<Event>;


  constructor() {
    console.log(window.innerWidth);
    console.log(this.windowHalfX);
  }

  ngOnInit() {
    this.iosa();
    //this.canvas = document.createElement('div');
   // document.body.appendChild(this.canvas);
    this.scene.background = this.textureCube;
    console.log(this.scene.background);
    this.material.envMap = this.textureCube;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    //this.canvas.appendChild(this.renderer.domElement);
    // this.renderer.setSize(500, 500);
    document.getElementsByTagName('body')[0].appendChild(this.renderer.domElement);
    this.camera.position.z = 3;
    
    this.effect.setSize(this.width, this.height);
    // this.camera.lookAt(0, 0, 0);
   // document.body.appendChild(this.canvas);
    this.animate();
    //window.addEventListener('resize', this.onWindowResize, false);
    console.log(this.windowHalfX, window.innerWidth);

    this.move =
      fromEvent(window,'mousemove');
    this.move.subscribe(x => {
      this.mouseX = ((x as MouseEvent).clientX - this.windowHalfX) /100;
      this.mouseY = ((x as MouseEvent).clientY - this.windowHalfY) / 100;

    })
    this.animate();
    
  }


  //onDocumentMouseMove(event) {
    // console.log(event.clientX);
   // console.log(window.innerWidth);
    //const x = 381.5;
   // const y = 381.5;
    // this.mouseX = (event.clientX - this.windowHalfX) / 100;
    // this.mouseY = (event.clientY - this.windowHalfY) / 100;
   // this.mouseX = (event.clientX - x) / 100;
   // this.mouseY = (event.clientY - x) / 100;
    // console.log(this.mouseX);
    // this.camera.position.setX(this.camera.position.x + (this.mouseX - this.camera.position.x) * 0.05);
    // this.camera.position.setY(this.camera.position.y + (this.mouseY - this.camera.position.y) * 0.05);

  //}
  animate() {

    requestAnimationFrame(this.animate.bind(this));

    this.render();
  
  }


  //onWindowResize() {

    // this.windowHalfX = window.innerWidth / 2;
    // this.windowHalfY = window.innerHeight / 2;

    // this.camera.aspect = window.innerWidth / window.innerHeight;
    // this.camera.updateProjectionMatrix();

    // console.log(window.innerWidth);
    // console.log(this.windowHalfX);


 // }
  render() {
    let timer = 0.0001 * Date.now();

    // this.camera.position.x += (this.mouseX - this.camera.position.x) * .05;
    // this.camera.position.y += (- this.mouseY - this.camera.position.y) * .05;
    //console.log(this.mouseX);
    // console.log(this.camera.position.x, (this.mouseX - this.camera.position.x) * 0.5, this.camera.position);
    this.camera.position.setX(this.camera.position.x + (this.mouseX - this.camera.position.x) * 0.05);
    this.camera.position.setY(this.camera.position.y + (this.mouseY - this.camera.position.y) * 0.05);

     

    console.log( this.camera.position);
    for (let i = 0, il = this.spheres.length; i < il; i++) {

      let sphere = this.spheres[i];

      sphere.position.x = 5 * Math.cos(timer + i);
      sphere.position.y = 5 * Math.sin(timer + i * 1.1);

    }
    this.camera.lookAt(this.scene.position);
    // this.effect.render(this.scene, this.camera);
    this.renderer.render(this.scene, this.camera);
  }


  // @HostListener('mousemove', ['$event'])
  // onMousemove(event: MouseEvent): void {
  //   console.log(event.clientX)
  // }

  iosa() {
    for (let i = 0; i < 500; i++) {

      let mesh = new Mesh(this.geometry, this.material);

      mesh.position.x = Math.random() * 10 - 5;
      mesh.position.y = Math.random() * 10 - 5;
      mesh.position.z = Math.random() * 10 - 5;

      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

      this.scene.add(mesh);

      this.spheres.push(mesh);
      // document.body.appendChild(this.canvas);
      //this.render()

      // document.addEventListener('mousemove', this.onDocumentMouseMove, false);
      //window.addEventListener('resize', this.onWindowResize, false);

    }
    // document.addEventListener('mousemove', onDocumentMouseMovse, false);
    // init();

    // animate();
    // document.addEventListener('mousemove', this.onDocumentMouseMove, false);
  }


  display() {
    // let g = new BoxGeometry(30, 30, 30);
    // let m = new MeshBasicMaterial({ color: 0xff8080 });
    // let box = new Mesh(g, m);
    // this.scene.add(box);
    // this.render();

    this.iosa();
    
  }

}
