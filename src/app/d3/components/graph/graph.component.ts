import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: 'graph.component.html',
  styleUrls: ['graph.component.scss'],
})
export class GraphComponent implements OnInit {
  // public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;

  public width = screen.width;
  public height = screen.height / 2;
  public numNodes = 100;
  public nodes = [];
  public links = [];

  constructor() {
    this.nodes = d3.range(this.numNodes).map(() => {
      return { radius: Math.random() * 25 };
    });
  }

  public ngOnInit() {
    this.simulation = d3
      .forceSimulation(this.nodes)
      .force('charge', d3.forceManyBody().strength(3))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force(
        'collision',
        d3.forceCollide().radius(() => {
          return 18;
        }),
      );

    // this.initBubbles();
    this.initSimulation();
    this.initForce();
  }

  // <!-- Base functions -->

  public initNodes() {
    if (!this.simulation) {
      throw new Error('Simulation was not initialized');
    }
    this.simulation.nodes(this.nodes);
  }

  public initLinks() {
    if (!this.simulation) {
      throw new Error('Simulation was not initialized');
    }
    this.simulation.force('links', d3.forceLink(this.links).strength(1 / 45));
  }

  public initSimulation() {
    if (!this.simulation) {
      // const ticker = this.ticker;

      this.simulation = d3
        .forceSimulation()
        .force('charge', d3.forceManyBody().strength(-2));

      this.simulation.on('tick', function() {
        // ticker.emit(this);
      });

      this.initNodes();
      this.initLinks();
    }
  }

  // <!-- Circles with random color -->

  public randomizeValue() {
    const value = x => {
      return Math.floor(Math.random() * x);
    };

    for (let i = 0; i < this.numNodes; i++) {
      this.nodes.push({
        x: value(this.width) + 70,
        y: value(this.height) + 70,
        r: value(1) + 20,
        fill: d3.rgb(value(255), value(255), value(255)),
      });
    }
  }

  public updateValue() {
    this.randomizeValue();

    const u = d3
      .select('svg')
      .selectAll<SVGCircleElement, any>('circle')
      .data(this.nodes);

    // Enter
    u.enter()
      .append('circle')
      .attr('r', 0)
      .attr('cx', this.width / 2)
      .attr('cy', this.height / 2)
      .style('fill', 'white')
      // .merge(u)
      .transition()
      .duration(1500)
      .attr('cx', function(d) {
        return d.x;
      })
      .attr('cy', function(d) {
        return d.y;
      })
      .attr('r', function(d) {
        return d.r;
      })
      .style('fill', function(d) {
        return d.fill;
      });

    // Exit
    u.exit()
      .transition()
      .duration(1500)
      .attr('r', 0)
      .style('opacity', 0)
      .remove();
  }

  public initForce() {
    this.simulation.on('tick', () => {
      const u = d3
        .select('svg')
        .selectAll<SVGCircleElement, any>('circle')
        .attr('fill', '#714cf9')
        .data(this.nodes);

      u.enter()
        .append('circle')
        .attr('r', function(d) {
          return d.radius;
        })
        .merge(u)
        .attr('cx', function(d) {
          return d.x;
        })
        .attr('cy', function(d) {
          return d.y;
        });
    });
  }

  public initCol() {
    this.simulation
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('collision', d3.forceCollide().radius(() => Math.random() * 25));
  }

  public initBubbles() {
    const svg = d3
      .select('.canvas')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    svg
      .append('text')
      .text('click this area')
      .attr('x', 100)
      .attr('y', 100);

    const events = [];
    svg.on('click', function() {
      events.push(d3.event);
      if (events.length > 100) {
        events.shift();
      }
      const circles = svg
        .selectAll('circle')
        .data(events, function(e) {
          return e.timeStamp;
        })
        .attr('fill', 'gray');
      circles
        .enter()
        .append('circle')
        .attr('cx', function(d) {
          return d.x || d.offsetX;
        })
        .attr('cy', function(d) {
          return d.y || d.offsetY;
        })
        .attr('fill', 'red')
        .attr('r', 0)
        .transition()
        .duration(700)
        .attr('r', 10);
      circles
        .exit()
        .transition()
        .attr('r', 0)
        .remove();
    });
  }
}
