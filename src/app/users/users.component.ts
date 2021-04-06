import { Component, OnInit,Inject } from '@angular/core';
import {  HttpClient  } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { GraphService} from '../graph.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  values:any =[];
  constructor(private http: HttpClient,public dialog: MatDialog, public graphService : GraphService) {
   
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
    this.graphService.getStudentsData().subscribe(
      data => {console.log(data);
        this.values = data;
      }
    );
  }

  getConfig() {

    return this.http.get('http://localhost:4000/api/users',{responseType: 'json'});
   }

}
// @Component({
//   selector: 'dialog-data-example-dialog',
//   template: `<h1 mat-dialog-title>Favorite Animal</h1>
//   <div mat-dialog-content>
//     My favorite animal is:
//     <ul>
//       <li>
//         <span *ngIf="data.animal === 'panda'">&#10003;</span> Panda
//       </li>
//       <li>
//         <span *ngIf="data.animal === 'unicorn'">&#10003;</span> Unicorn
//       </li>
//       <li>
//         <span *ngIf="data.animal === 'lion'">&#10003;</span> Lion
//       </li>
//     </ul>
//   </div>`,
// })
// export class DialogDataExampleDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }