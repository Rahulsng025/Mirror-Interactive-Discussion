import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MirrorService {
  uri = 'http://mirror.shreddersbay.com/mirror/public/api';
  authToken:any

  token= localStorage.getItem('token');
  constructor(private http: HttpClient) { }

  storeUserData(token: any){
    console.log(token);
    localStorage.setItem('id_token', token);
    this.authToken = token;
  }

  public getToken(): string{
    return localStorage.getItem('id_token');
    }


  getMeetingLink(){
    const auth_token=localStorage.getItem('id_token');
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${auth_token}`);
    return this.http.get(`${this.uri}/auth/getmeetinglink`,  {headers:{'Authorization': `Bearer ${auth_token}`}});
  }

  addMeetingLink(formData): Observable<any>{
    const auth_token=localStorage.getItem('id_token');
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${auth_token}`);
    return this.http.post(`${this.uri}/auth/addmeetinglink`,formData, {headers:{'Authorization': `Bearer ${auth_token}`}})
  }

}
 