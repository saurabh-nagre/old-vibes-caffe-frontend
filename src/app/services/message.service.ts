import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) { }

  sendSms(body:string,number:number){
    return this.http.post('https://old-vibes-caffe.herokuapp.com/sms',{message:body,number:number});
  }

}
