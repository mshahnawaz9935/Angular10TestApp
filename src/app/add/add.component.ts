import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';

export class Address {

  constructor(
    public id: number,
    public street1: string,
    public street2: string,
    public town: string,
    public contactId : number,
    public country: string
  ) {  }

}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

   addressData : Address[] =[];
   contactDetails:any;
  success : boolean = false;
  showSecond = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private http: HttpClient ,private dataService : DataService , private dialogRef: MatDialogRef<AddComponent> ) {

    console.log('injected data' , data);
    this.contactDetails = data;

    this.getAddress(data.id);

   }

   countries:any = [];

  model1 = new Address(0,'','' ,'',0,'');
  model2 = new Address(0,'','' ,'',0,'');

  ngOnInit(): void {

    this.getCountries();

  }

  getCountries()
  {
    this.dataService.getCountries().subscribe(data=> this.countries = data);
  }

  getAddress(id:number)
  {
    this.dataService.getAddress()
    .pipe(map((data: Address[]) => data.filter(item => item.contactId == id)))
    .subscribe(  result => {
      
       this.addressData = result;
       console.log(this.addressData , result);
             if(this.addressData.length == 2)
            {
              this.model1 = new Address(  this.addressData[0].id,  this.addressData[0].street1,  this.addressData[0].street2,  this.addressData[0].town, this.addressData[0].contactId,  this.addressData[0].country );
              this.model2 = new Address(  this.addressData[1].id,  this.addressData[1].street1,  this.addressData[1].street2,  this.addressData[1].town,this.addressData[0].contactId,  this.addressData[1].country );
            }
            else {
              this.model1 = new Address(  this.addressData[0].id,  this.addressData[0].street1,  this.addressData[0].street2,  this.addressData[0].town, this.addressData[0].contactId,  this.addressData[0].country );
              this.model2 = new Address( 0,'','','',0,'' );
            }
          
    });

  
  }
  updateAddress(data : any , id:number)
  {
    console.log('update address', data , this.contactDetails);
    data.contactId = this.contactDetails.id;

    this.dataService.updateAddress(data,id).subscribe
    (data=> 
      {
        console.log(data)
        this.success = true,
        setTimeout( () => 
        { 
            this.dialogRef.close() ,
            this.success = false    
        } , 3000) 
    })
  }

  addAddress(data:any)
  {
    console.log('add address' , data , this.contactDetails);
    data.contactId = this.contactDetails.id;

   this.dataService.addAddress(data).subscribe
    (data=> 
      {
        console.log(data),
        this.success = true,
        setTimeout( () => 
        { 
            this.dialogRef.close() ,
            this.success = false    
        } , 3000) 
    })
  }

  onSubmit(form: NgForm, id:number) {
    console.log('Your form data : ', form.value ,this.addressData.length , id );
    if(this.addressData.length == 0 || id == 0)
    {
      this.addAddress(form.value);
    } 
    else {
      this.updateAddress(form.value, id);
     
    }

  }

}
