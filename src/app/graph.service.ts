import { Injectable } from '@angular/core';
import { Chart  } from 'angular-highcharts';
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';

export interface MilkData {
  TwentyFourMonths : Array<any>,
  alertCounts : Array<any>
}

export interface Student
{
  name : String;
  email : String;
  address : String;
  phone : Number;
  id :Number;
}

@Injectable({
  providedIn: 'root'
})
export class GraphService {

    animals : any = [];

  constructor(private http: HttpClient) {
    console.log('in the Graph Service');
   }

   getAnimals() {

    return  this.http.get('http://localhost:3000/animals',{responseType: 'json'});
   
   }

   addAnimals(data:any) {

    return this.http.post('http://localhost:3000/animals', data,{responseType: 'json'});
   }

   updateAnimals(id:number , data:any) {

    return this.http.put('http://localhost:3000/animals/' + id, data,{responseType: 'json'});
   }


   getFileData()
   {
     return this.http.get<MilkData>('assets/1320.json', {responseType : 'json'});
   }

   getStudentsData()
   {
     return this.http.get('https://localhost:44354/api/StudentsAPI', {responseType : 'json'});
   }

  addStudent(data:any)
  {
   var options: {
        headers?: HttpHeaders | {[header: string]: string | string[]},
        observe?: 'body' | 'events' | 'response',
        params?: HttpParams|{[param: string]: string | string[]},
        reportProgress?: boolean,
        responseType?: 'arraybuffer'|'blob'|'json'|'text',
        withCredentials?: boolean,
      }
    return this.http.post<Student>('https://localhost:44354/api/StudentsAPI',data, {responseType: 'json'})
  }

   chart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
        text: '',
        
    },
    subtitle: {
    //    text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: [
            'Jan',  'Feb',  'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

    }, {
        name: 'New York',
        type:'column',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

    }, {
        name: 'London',
        type:'column',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

    }, {
        name: 'Berlin',
        type:'column',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }]
    } as any);
}
