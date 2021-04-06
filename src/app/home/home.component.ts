import { Component, OnInit } from '@angular/core';
import {  HttpClient  } from '@angular/common/http'; 
import DataGrid from "devextreme/ui/data_grid";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  values:any = [];

  constructor(private http: HttpClient) {
    var p =   this.getConfig().subscribe(data=>{ 
      console.log(data);
      this.values = data;
    }
    );
   }


  ngOnInit(): void {
   
  }
  getConfig() {

   return this.http.get('assets/199.json',{responseType: 'json'});
  }

}
