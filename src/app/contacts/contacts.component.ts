import { Component, OnInit } from '@angular/core';
import {  HttpClient  } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { GraphService} from '../graph.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  values:any = [];
  constructor(private http: HttpClient,public dialog: MatDialog, public graphService : GraphService)
  {

   }
  openDialog(type:any) {

    var modalType;

    if(type === 'add')
    modalType = AddComponent;
    else modalType = EditComponent;

    const dialogRefBox = this.dialog.open(modalType, {
      height: '500px',
      width: '600px',
    });

    dialogRefBox.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
   
        this.getConfig().subscribe(
      data => {console.log(data);
        this.graphService.values = data;
      }
    );

  }
  getConfig() {

    return this.http.get('http://localhost:3000/contacts',{responseType: 'json'});
   }

}
