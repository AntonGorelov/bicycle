import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './components/graph/graph.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    GraphComponent,
  ],
  declarations: [
    GraphComponent,
  ]
})
export class D3Module { }
