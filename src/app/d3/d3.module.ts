import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphComponent } from './components/graph/graph.component';
import { TimelineComponent } from './components/timeline/timeline.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    GraphComponent,
    TimelineComponent,
  ],
  declarations: [
    GraphComponent,
    TimelineComponent,
  ]
})
export class D3Module { }
