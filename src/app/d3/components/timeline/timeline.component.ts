import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent implements OnInit, AfterViewInit {
  private colorMap = {
    itemType1: 'red',
    itemType2: 'orange',
    itemType3: '#00c2d6',
    itemType4: 'green',
  };

  // Time Formats
  private _ts = Math.round(new Date().getTime() / 1000);
  private _tsYesterday = this._ts - 24 * 3600;
  private _tsMonthAgo = this._ts - 24 * 3000 * 30;
  private _tsWeekAgo = this._ts - 24 * 3000 * 7;

  private _dateNow: any = new Date(this._ts * 1000);
  private _dateTwentyFourHoursAgo: any = new Date(this._tsYesterday * 1000);
  private _dateMonthAgo: any = new Date(this._tsMonthAgo * 1000);
  private _dateWeekAgo: any = new Date(this._tsWeekAgo * 1000);

  // Domain in Timestamps:
  private _tsDateNow = Date.parse(this._dateNow);
  private _tsDateTwentyFourHoursAgo = Date.parse(this._dateTwentyFourHoursAgo);
  private _tsDateMonthAgo = Date.parse(this._dateMonthAgo);
  private _tsDateWeekAgo = Date.parse(this._dateWeekAgo);

  private _margin = { top: 0, right: 160, bottom: 30, left: 160 };
  private _width = 1200 - this._margin.left - this._margin.right;
  private _height = 420 - this._margin.top - this._margin.bottom;

  private _zoom = d3
    .zoom()
    // translateExtent - width - in charge of how many items can stack inside
    .translateExtent([[0, +30], [this._width * 2, this._height]])
    .scaleExtent([1, 100])
    .on('zoom', () => {
      this.zoomed();
      this.reRender();
    });

  private _svg;
  private _viewBox;
  private _xAxis;
  private _xScale;
  private _gX;

  @Input()
  public logs;

  constructor() {}

  public ngOnInit(): void {
    this._svg = d3
      .select('.chart')
      .append('svg')
      .attr('width', this._width + this._margin.left + this._margin.right)
      .attr('height', this._height + this._margin.top + this._margin.bottom)
      .append('g')
      .attr('class', 'main-container')
      .attr(
        'transform',
        `translate(${this._margin.left}, ${this._margin.top})`,
      );

    // Enable Zoom Behavior on SVG
    this._svg.call(this._zoom);

    // x Scale & Axis - domain in timestamps
    this._xScale = d3
      .scaleTime()
      .domain([this._tsDateMonthAgo, this._tsDateNow])
      .range([0, this._width]);

    // Bar above scale/axis
    this._viewBox = this._svg
      .append('rect')
      .attr('width', this._width)
      .attr('height', this._height)
      .style('fill', 'white')
      .style('cursor', 'move');

    this._xAxis = d3.axisBottom(this._xScale);

    // Bottom x scale
    this._gX = this._svg
      .append('g')
      .attr('transform', `translate(0, ${this._height})`)
      .attr('class', 'x axis')
      .call(this._xAxis);
  }

  public ngAfterViewInit() {
    this.render(this.logs);
  }

  public render(data) {
    const circles = this._svg.selectAll('circle').data(data);

    circles
      .enter()
      .append('g')
      .attr('class', 'dot')
      .append('circle')
      .attr('r', 5)
      .attr('cy', this._height)
      .attr('cx', d => {
        return this._xScale(new Date(d.CreationDateTime).getTime());
      })
      .style('fill', d => this.colorMap[d.Type]);

    circles.exit().remove();
  }

  public reRender() {
    // Preserve logs data
    const oldLogs = this.logs;

    // Remove
    this.logs = [];

    // Update Original;
    this.logs = oldLogs;

    this.render(oldLogs);
  }

  public rePosition(transitionX, kFactor, data) {
    const oldX = this._xScale(new Date(data.CreationDateTime).getTime());
    const newXPosition = transitionX + kFactor * oldX;

    return newXPosition;
  }

  public zoomed() {
    const tX = d3.event.transform.x;
    const k = d3.event.transform.k;

    // Zoom on bar
    this.render(this.logs);

    // Zoom / side-scroll on xAxis
    this._gX.call(this._xAxis.scale(d3.event.transform.rescaleX(this._xScale)));

    // Draw the CIRCLES in their new position:
    // d3.selectAll('circle').attr('cx', (d) => this.rePosition(tX, k, d));
  }
}
