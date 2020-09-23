import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { initRenderer, initCamera, initScene, initObject, initStats, render, resizeRender } from './base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'threejs';
  
    @ViewChild('starry', { static: true }) starry: ElementRef;
    constructor() {}
  
    ngOnInit() {
      this.init();
    }
    init() {
      initRenderer(this.starry.nativeElement);
      initCamera(this.starry.nativeElement);
      initScene();
      initObject();
      initStats(this.starry.nativeElement);
      render();
    }
    
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      resizeRender(this.starry.nativeElement);
    }
  }

