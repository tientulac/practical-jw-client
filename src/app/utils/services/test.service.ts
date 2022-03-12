import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Injectable({
    providedIn: 'root'
})

export class TestService {
  
    constructor(@Inject(AppConfig) private readonly appConfig: AppConfiguration, private http: HttpClient) { }
  
    getList(): Observable<any> {
      return this.http
        .get<any>('http://localhost:8080/api/employee')
        .pipe(
          map((z) => {
            return z;
          })
        );
    }

    insert(req): Observable<any> {
      return this.http
        .post<any>('http://localhost:8080/api/employee', req)
        .pipe(
          map((z) => {
            return z;
          })
        );
    }

    update(req): Observable<any> {
      return this.http
        .put<any>('http://localhost:8080/api/employee', req)
        .pipe(
          map((z) => {
            return z;
          })
        );
    }

    delete(id: number): Observable<any> {
      return this.http
        .delete<any>('http://localhost:8080/api/employee/'+id)
        .pipe(
          map((z) => {
            return z;
          })
        );
    }
}