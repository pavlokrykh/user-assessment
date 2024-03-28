import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://user-assessment-api.vercel.app';
  private token: string | null = null;
  private role: string | null = null;

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    const body = {email, password};
    const url = `${this.apiUrl}/api/login`;

    return this.httpClient.post<any>(url, body).pipe(
      tap({
        next: res => {
          this.token = res.token;
          this.role = res.role;
          sessionStorage.setItem('userToken', res.token);
        },
        error: () => {
          sessionStorage.removeItem('userToken');
        }
    })
    );
  }

  getToken() {
    return this.token;
  }

  getRole() {
    return this.role;
  }

  getUserAssessments(): Observable<any[]> {
    const url = `${this.apiUrl}/api/userassessments`;
    return this.httpClient.get<any[]>(url);
  }

  getAssessmentGraphData(id: number): Observable<any> {
    const url = `${this.apiUrl}/api/userassessments/graph`;
    let params = new HttpParams().set('id', id);
    return this.httpClient.get<any>(url, {params});
  }

  getUsers(): Observable<any[]> {
    const url = `${this.apiUrl}/api/users`;
    return this.httpClient.get<any[]>(url);
  }

}
