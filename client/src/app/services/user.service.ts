import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string; 
  

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.api;
  }

  /**
   * Get token access
   * @param email users's email
   * @param pass user's email
   * @return json with data 
   */
  public login(email: string, password: string): Observable<any> {
      
    //hago la peticion
    const user = 
            { 
              email: email, 
              password: password                 
            }; 

    const headers = new HttpHeaders();//.set('Content-Type', 'application/json');

    return this._http.post(this.url + '/users/login', JSON.stringify(user), {'headers': headers});
  }

  public getToken(): string{
    return localStorage.getItem('panel-token');
  }

  public getAll(): Observable<any>{
    const headers = new HttpHeaders();
    return this._http.get(this.url + '/users', {headers: headers} );
  }

  public delete(user: User): Observable<any> {
    const headers = new HttpHeaders({
      Authorization : this.getToken()
    });
    return this._http.delete(this.url + '/users/' + user.id, {headers : headers});
  }

  
  public insert(user: User): Observable<any> {
    const headers = new HttpHeaders({
      Authorization : this.getToken()
    });
    return this._http.post(this.url + '/users', JSON.stringify(user), {headers : headers});
  }
  
  public update(user: User): Observable<any> {
    const headers = new HttpHeaders({
      Authorization : this.getToken(),
      'Content-Type' : 'application/json'
    });
    return this._http.put(this.url + '/users/' + user.id, JSON.stringify(user), {headers : headers});
  }


}
