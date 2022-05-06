import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import LinearGradient from 'zrender/lib/graphic/LinearGradient';

@Component({
  selector: 'app-events-charts',
  template: `
    <div echarts [options]="options" class="demo-chart"
         (chartInit)="onChartEvent($event, 'chartInit')"
         (chartClick)="onChartEvent($event, 'chartClick')"
         (chartDblClick)="onChartEvent($event, 'chartDblClick')"
         (chartMouseDown)="onChartEvent($event, 'chartMouseDown')"
         (chartMouseUp)="onChartEvent($event, 'chartMouseUp')"
         (chartMouseOver)="onChartEvent($event, 'chartMouseOver')"
         (chartMouseOut)="onChartEvent($event, 'chartMouseOut')"
         (chartGlobalOut)="onChartEvent($event, 'chartGlobalOut')"
         (chartContextMenu)="onChartEvent($event, 'chartContextMenu')"
         (chartDataZoom)="onChartEvent($event, 'chartDataZoom')">
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsChartsComponent implements OnInit {

  options: any;

  constructor() {}

  ngOnInit(): void {
    const dataAxis = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
    ];
    const data = [
      220,
      182,
      191,
      234,
      290,
      330,
      310,
      123,
      442,
      321,
      90,
      149,
      210,
      122,
      133,
      334,
      198,
      123,
      125,
      220,
    ];
    const yMax = 500;
    const dataShadow = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    this.options = {
      title: {
        text: 'Check Console for Events',
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          color: '#fff',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#999',
          },
        },
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          // For shadow
          type: 'bar',
          itemStyle: {
            color: 'rgba(0,0,0,0.05)'
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false,
        },
        {
          type: 'bar',
          itemStyle: {
            color: new LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            }
          },
          data,
        },
      ],
    };
  }

  onChartEvent(event: any, type: string) {
    console.log('chart event:', type, event);
  }
}
