import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { GraphService } from '../graph.service';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

export class Student {

  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public address?: string
  ) {  }

}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData ,private http: HttpClient ,private graphService : GraphService , private dialogRef: MatDialogRef<AddComponent> ) { }

  model = new Student(0,'','xyz@gmail.com' ,'' );

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this.graphService.values.push(form.value);
  //  this.graphService.addStudent(form.value).subscribe(data => this.dialogRef.close(form.value));
  }

}
