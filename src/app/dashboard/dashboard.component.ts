import { Component, OnInit } from '@angular/core';
import { GraphService} from '../graph.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  twentyFourMonthsData: any = [];
  chart : any;

  constructor( graphService : GraphService) {

    this.chart = graphService.chart;

    graphService.getFileData().subscribe(
      data  => {
        this.twentyFourMonthsData = data.TwentyFourMonths;
        this.setChart( this.twentyFourMonthsData);
      }
    )
   }

  ngOnInit(): void {
  }

  setChart(data:any)
  {
    console.log('set chart');
    while(this.chart.ref.series.length > 0)            // To empty the chart series every time
    this.chart.ref.series[0].remove(true);

    let series5 : any = {
      name: 'Las Vegas',
      type:'column',
      data: [23.4, 23.2, 23.5, 23.7, 23.6, 32.5, 32.4, 32.4, 32.6, 39.1, 32.8, 23.1]
    };
     this.chart.addSeries(series5, true ,false);
      //  this.chart.addPoint(Math.floor(Math.random() * 10));
    var month=new Array(12);
    month[0]="Jan";  month[1]="Feb"; month[2]="Mar"; month[3]="Apr"; month[4]="May"; month[5]="Jun";
    month[6]="Jul"; month[7]="Aug"; month[8]="Sep"; month[9]="Oct"; month[10]="Nov"; month[11]="Dec";

    var Months = [];

    var chartData :any= [];
    
  var columnData1 = [];
  for(var i=0;i<12;i++)
  {
      var columnYear = (new Date(data[i].month).getFullYear() + "").substr(2,2);
      var columnMonth = month[new Date(data[i].month).getMonth()];

      Months.push(columnMonth);
      columnData1.push(data[i].total_yield);

  }
  columnData1 = columnData1.reverse();

  var series1:any = {
    name: '2019',
    data: columnData1,
    color: '#0055a5'
  };

  var columnData2 = [];
  for(var i=12;i<24;i++)
  {
        if(data[i] !=undefined)
        {
          var columnMonth = month[new Date(data[i].month).getMonth()];
          
          columnData2.push(data[i].total_yield);
          console.log(columnMonth , columnData2);
        }
        else {
          columnData2.push(0.0);
        }
  }
  columnData2 = columnData2.reverse();

  var series2 :any = {
    name: '2020',
    data: columnData2,
    color: '#dfdd07'
  };

  this.chart.ref.xAxis[0].setCategories([]); 
  this.chart.ref.xAxis[0].setCategories(Months.reverse()); 
  this.chart.ref.series[0].setData(chartData, true);
  this.chart.addSeries(series2, true,false);
  this.chart.addSeries(series1, true , false);
  }

 
  
}