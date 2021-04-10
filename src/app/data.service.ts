import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Contact {

  constructor(
    public fullname: string,
    public firs_tname: string,
    public last_name: string,
  ) {  }

}

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

@Injectable({
  providedIn: 'root'
})
export class DataService {

    contacts : any = [];

  constructor(private http: HttpClient) {
    console.log('in the Data Service');
   }

   addContact(data:any)
   {
     return  this.http.post<Contact>('http://localhost:3000/contacts',data, {responseType: 'json'});
   }

   getContacts() {

     return this.http.get('http://localhost:3000/contacts',{responseType: 'json'})
   }

   deleteContact(id:number)
   {
     return this.http.delete('http://localhost:3000/contacts/'+ id,{responseType: 'json'})

   }

   addAddress(data:any)
   {
    return this.http.post('http://localhost:3000/addresses/' , data );
   }

   getCountries()
   {
     return this.http.get('http://localhost:3000/countries');
   }
   getAddress()
   {
     return this.http.get<Address[]>('http://localhost:3000/addresses/' , {responseType : 'json'});
   }

   updateAddress(data : any , id:number)
  {

    return this.http.put('http://localhost:3000/addresses/' + id , data );
  }

}
