import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

			import Stats from 'stats';
		
      import { GPUComputationRenderer, Variable } from 'three/examples/jsm/misc/GPUComputationRenderer';
      import { init,animate } from './bird_test'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit() {
    init();
			animate();
  }
}


