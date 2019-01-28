import { Component } from '@angular/core';

@Component({
  selector: 'app-d3',
  templateUrl: 'd3.view.html',
  styleUrls: ['d3.view.scss'],
})
export class D3View {
  constructor() {}

  public logs = [
    {
      CreationDateTime: 'Sun Dec 09 00:00:45 EST 2016',
      Type: 'itemType1',
    },
    {
      CreationDateTime: 'Sun Dec 09 00:00:45 EST 2014',
      Type: 'itemType2',
    },
  ];
}
