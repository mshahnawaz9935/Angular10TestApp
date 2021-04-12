import { Component, OnInit } from '@angular/core';
import {  HttpClient  } from '@angular/common/http'; 
import DataGrid from "devextreme/ui/data_grid";
import { MatDialog} from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { GraphService } from '../graph.service';
import { map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  animals:any = [];

  constructor(private http: HttpClient, public dialog: MatDialog , public dataService : GraphService) {
    this.dataService.getAnimals()
    .subscribe(
      data => this.dataService.animals = data
    )
   }


  ngOnInit(): void {
   
  }
  openModalBox(type :string, data : Object)
  {
    console.log( 'in open' ,type , data);

    let modalBox = this.dialog.open( AddComponent, {
      data : data,
      height : '600px',
      width : '500px'

    });
    modalBox.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });


  }
 

}
