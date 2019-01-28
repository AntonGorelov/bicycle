import { Component } from '@angular/core';

@Component({
  selector: 'app-d3',
  templateUrl: 'd3.view.html',
  styleUrls: ['d3.view.scss']
})
export class D3View {

  constructor() {}

  public logs = [
    {
      CreationDateTime: '309',
      Type: 'itemType1'
    },
    {
      CreationDateTime: '290',
      Type: 'itemType2'
    },
    {
      CreationDateTime: '390',
      Type: 'itemType3'
    },
    {
      CreationDateTime: '720',
      Type: 'itemType4'
    },
    {
      CreationDateTime: '721',
      Type: 'itemType1'
    },
    {
      CreationDateTime: '900',
      Type: 'itemType2'
    }
  ];
}