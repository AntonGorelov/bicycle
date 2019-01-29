import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphComponent } from './components/graph/graph.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MotionComponent } from './components/motion/motion.component';
import { D3View } from './views/d3.view';

@NgModule({
  imports: [CommonModule],
  exports: [GraphComponent, TimelineComponent, MotionComponent, D3View],
  declarations: [GraphComponent, TimelineComponent, MotionComponent, D3View],
})
export class D3Module {}
