import { Component, OnInit } from '@angular/core';
import {  HttpClient  } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { DataService} from '../data.service';

export class Contact {

  constructor(
    public fullname: string,
    public firs_tname: string,
    public last_name: string,
  ) {  }

}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  values:any = [];

  model = new Contact('','','');
  constructor(private http: HttpClient,public dialog: MatDialog, public dataService : DataService)
  {

   }
  openDialog( item:any) {

    var modalType;

    modalType = AddComponent;

    const dialogRefBox = this.dialog.open(modalType, {
      data: item,
      height: '500px',
      width: '600px',
    });

    dialogRefBox.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
   
        this.getContacts();

  }
  deleteContact(id:number)
  {
    console.log(id);
    this.dataService.deleteContact(id)
    .subscribe(
      data => { 
        this.getContacts();}
    );
  }
  addContact()
  {
    console.log(this.model);  
    var fullname = this.model.fullname;
    var names = this.model.fullname.split(' ');
    var data = {
      first_name :  names[0],
      last_name : names[1],
      avatar : ''

    };
    console.log(data , names);
    this.dataService.addContact(data).subscribe(data => {
      this.dataService.contacts.push(data);
      this.model = new Contact('','','');
    })

  }

  getContacts() {

    this.dataService.getContacts().subscribe(
      data => {
        this.dataService.contacts = data;
      }
    );
   }

}
