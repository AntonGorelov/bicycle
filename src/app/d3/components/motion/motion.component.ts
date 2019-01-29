import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-motion',
  templateUrl: 'motion.component.html',
  styleUrls: ['motion.component.scss']
})
export class MotionComponent implements OnInit, AfterViewInit {

  constructor() {}
  public widthFig = 960;
  public heightFig = 600;
  public gasMoleculeCount = 3000;
  public dustCount = 10;
  public node;
  public particle;

  @ViewChild('historical')
  public historicalCanvas: ElementRef;

  public histContext: CanvasRenderingContext2D;

  @ViewChild('realtime')
  public realtimeCanvas: ElementRef;

  public realContext: CanvasRenderingContext2D;

  public gasMolecules = d3.range(this.gasMoleculeCount).map(() => {
    const randomAngle = Math.random() * 2 * Math.PI;
    return {
      radius: 0.5,
      x: Math.random() * 960 - 960 / 2,
      y: Math.random() * 600 - 600 / 2,
      vx: 5 * Math.cos(randomAngle),
      vy: 5 * Math.sin(randomAngle)
    };
  });

  public dustParticles = d3.range(this.dustCount).map(() => {
    return {
      radius: 3,
      x: (Math.random() * 960 - 960 / 2) / 2,
      y: (Math.random() * 600 - 600 / 2) / 2,
      vx: 0,
      vy: 0
    };
  });

  public nodes = this.dustParticles.concat(this.gasMolecules);

  public radius = (node) => {
    return node.radius;
  }

  public recycle = (alpha) => {
    for ( let i = 0; i < this.nodes.length; i++) {
      this.node = this.nodes[i];
      if (Math.abs(this.node.x) > this.widthFig / 2 - this.node.radius) {
        this.node.vx *= -1;
      }
      if (Math.abs(this.node.y) > this.heightFig / 2 - this.node.radius) {
        this.node.vy *= -1;
      }
    }
  }

  public render = () => {
    this.realContext.clearRect(-this.widthFig / 2, -this.heightFig / 2, this.widthFig, this.heightFig);
    this.histContext.beginPath();
    for (let i = 0; i < this.dustCount; i++) {
      this.particle = this.dustParticles[i];
      this.histContext.moveTo(this.particle.x, this.particle.y);
      this.histContext.lineTo(this.particle.x + 1, this.particle.y + 1);
    }
    this.histContext.stroke();
    this.realContext.beginPath();
    for (let i = 0; i < this.gasMoleculeCount; i++) {
      this.particle = this.gasMolecules[i];
      this.realContext.moveTo(this.particle.x, this.particle.y);
      this.realContext.lineTo(this.particle.x + 1, this.particle.y);
    }
    this.realContext.stroke();
    this.realContext.beginPath();
    for (let i = 0; i < this.dustCount; i++) {
      this.particle = this.dustParticles[i];
      const r = this.particle.radius;
      this.realContext.moveTo(this.particle.x + r, this.particle.y);
      this.realContext.arc(this.particle.x, this.particle.y, r, 0, 2 * Math.PI);
    }
    this.realContext.fill();
  }

  public ngOnInit(): void {
    d3.forceSimulation(this.nodes)
      .alphaDecay(0)
      .velocityDecay(5e-4)
      .force('collide', d3.forceCollide().radius(this.radius).strength(1).iterations(1))
      .force('recycle', this.recycle)
      .on('tick', this.render);
  }

  public ngAfterViewInit(): void {
    this.histContext = (<HTMLCanvasElement>this.historicalCanvas.nativeElement)
      .getContext('2d', { alpha: true });

    (<HTMLCanvasElement>this.historicalCanvas.nativeElement).width = this.widthFig / 2;
    (<HTMLCanvasElement>this.historicalCanvas.nativeElement).height = this.heightFig / 2;
      // .transform(1, 0, 0, 1, this.widthFig / 2, this.heightFig / 2);

    this.realContext = (<HTMLCanvasElement>this.realtimeCanvas.nativeElement)
      .getContext('2d', { alpha: true });

    (<HTMLCanvasElement>this.realtimeCanvas.nativeElement).width = this.widthFig / 2;
    (<HTMLCanvasElement>this.realtimeCanvas.nativeElement).height = this.heightFig / 2;
      // .transform(1, 0, 0, 1, this.widthFig / 2, this.heightFig / 2);

    this.realContext.lineWidth = 1;
    this.realContext.fillStyle = 'red';

    this.histContext.lineWidth = 1;
    this.histContext.strokeStyle = 'rgba(128, 0, 255, 0.02)';
  }

}
