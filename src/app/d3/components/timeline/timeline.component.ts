import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit, AfterViewInit {

  private colorMap = {
    itemType1: 'red',
    itemType2: 'orange',
    itemType3: '#00c2d6',
    itemType4: 'green'
  };

  // Time Formats
  private ts = Math.round(new Date().getTime() / 1000);
  private tsYesterday = this.ts - (24 * 3600);
  private tsMonthAgo = this.ts - (24 * 3000 * 30);
  private tsWeekAgo = this.ts - (24 * 3000 * 7);

  private dateNow: any = new Date(this.ts * 1000);
  private dateTwentyFourHoursAgo: any = new Date(this.tsYesterday * 1000);
  private dateMonthAgo: any = new Date(this.tsMonthAgo * 1000);
  private dateWeekAgo: any = new Date(this.tsWeekAgo * 1000);

  // Domain in Timestamps:
  private tsDateNow = Date.parse(this.dateNow);
  private tsDateTwentyFourHoursAgo = Date.parse(this.dateTwentyFourHoursAgo);
  private tsDateMonthAgo = Date.parse(this.dateMonthAgo);
  private tsDateWeekAgo = Date.parse(this.dateWeekAgo);


  private margin = { top: 0, right: 160, bottom: 30, left: 160 };
  private width = screen.width - this.margin.left - this.margin.right;
  private height = 420 - this.margin.top - this.margin.bottom;

  private  zoom = d3.zoom()
  // translateExtent - width - in charge of how many items can stack inside
    .translateExtent([[0, +30], [this.width * 2, this.height]])
    // scaleExtent - how much zoom scales.
    .scaleExtent([1, 100])
    .on ('zoom', () => {
      // Zoom to a deeper Resolution:
      this.zoomed();
      // Re-Render
      this.reRender();
    });

  private svg;
  private viewBox;
  private xAxis;
  private yAxis;
  private xScale;
  private yScale;
  private gX;

  @Input()
  public logs;

  constructor() {}

  public ngOnInit(): void {
    this.svg = d3.select('.chart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('class', 'main-container')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // // Enable Zoom Behavior on SVG
    this.svg.call(this.zoom);

    // x Scale & Axis - domain in timestamps
    this.xScale = d3
      .scaleTime()
      .domain([this.tsDateMonthAgo, this.tsDateNow])
      .range([0, this.width]);

    // // Bar above scale/axis
    this.viewBox = this.svg.append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('fill', 'white')
      .style('cursor', 'move');

    this.xAxis = d3.axisBottom(this.xScale);
    this.yAxis = d3.axisLeft(this.yScale);

    // Bottom x scale
    this.gX = this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .attr('class', 'x axis')
      .call(this.xAxis);
  }

  public ngAfterViewInit() {
    this.render(this.logs);
  }

  public render(data) {

    let circles;

    // JOIN
    circles = this.svg.selectAll('circle')
      .data(data);

    // UPDATE - add circles
    circles
      .enter()
      .append('g')
      .attr('class', 'dot')
      .append('circle')
      .attr('r', 5)
      .attr('cy', this.height)
      .attr('cx', (d) => {
        console.log(this.xScale(new Date('2018,2,2')));


        return d.CreationDateTime;
      })
      .style('fill', (d) => this.colorMap[d.Type]);


    // EXIT
    circles.exit().remove();
  }

  public reRender() {
    // Preserve logs data
    const oldLogs = this.logs;

    // Remove
    this.logs = [];

    // Update Original;
    this.logs = oldLogs;

    // Get logs back and Re-Render
    this.render(oldLogs);
  }

  public rePosition(transitionX, kFactor, data) {
    const oldX = data.CreationDateTime;
    const newXPosition = (transitionX + kFactor * oldX);
    return newXPosition;
  }

  public zoomed() {
    // New Position:
    const tX = d3.event.transform.x;
    const k = d3.event.transform.k;

    // Zoom on bar
    this.render(this.logs);

    // Zoom / side-scroll on xAxis
    this.gX.call(this.xAxis.scale(d3.event.transform.rescaleX(this.xScale)));

    // Draw the CIRCLES in their new position:
    d3.selectAll('circle').attr('cx', (d) => this.rePosition(tX, k, d));
  }


}
