import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GraphService } from '../graph.service';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

export class Animal {

  constructor(
    public id: number,
    public cow_id: string,
    public dim: string,
    public rf_id: string,
    public dob?: string,
    public national_id?: string,
    public last_heat?: string,

  ) {  }

}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  model = new Animal(0,'','xyz@gmail.com' ,'' );

  constructor(@Inject(MAT_DIALOG_DATA) public data: Animal ,private http: HttpClient ,private dataService : GraphService , private dialogRef: MatDialogRef<AddComponent> ) {

    console.log(data);
    if(data != null || data != undefined)
    {
      this.model = new Animal(data.id ,data.cow_id , data.dim, data.rf_id , data.dob, data.national_id, data.last_heat );

    }
   }

  

  ngOnInit(): void {
  }

  getAnimals(){
    this.dataService.getAnimals().subscribe(data => {
      this.dataService.animals = data;
    })
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    if(this.data.id == undefined)
    {
      console.log('add');
     this.dataService.addAnimals(form.value).subscribe(
       data =>  {    this.dataService.animals.push(data),
          this.getAnimals(),
          this.dialogRef.close() 
       }
     )
    } 
    else {
      console.log('update');
      this.dataService.updateAnimals(this.data.id , form.value ).subscribe(
        data =>{ console.log(data),
          this.getAnimals(),
          this.dialogRef.close() 
          
        }
      )
     
    }
    
  //  this.graphService.values.push(form.value);
  //  this.graphService.addStudent(form.value).subscribe(data => this.dialogRef.close(form.value));
  }

}
