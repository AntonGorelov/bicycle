import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: 'graph.component.html',
  styleUrls: ['graph.component.scss']
})
export class GraphComponent implements OnInit {

  constructor() {}

  public ngOnInit() {
    this.initD3();
  }

  public initD3() {
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
    svg.on('click', function () {
      events.push(d3.event);
      if (events.length > 100) {
        events.shift();
      }
      const circles = svg.selectAll('circle')
        .data(events, function (e) { return e.timeStamp; })
        .attr('fill', 'gray');
      circles
        .enter()
        .append('circle')
        .attr('cx', function (d) {

          return d.x || d.offsetX;
        })
        .attr('cy', function (d) {

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
