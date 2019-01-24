import * as d3 from 'd3';

export class Node implements d3.SimulationNodeDatum {
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  d?: number | null;

  id: string;
  linkCount: number;

  constructor(id) {
    this.id = id;
  }
}
