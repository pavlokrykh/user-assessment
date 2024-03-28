import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://user-assessment-api.vercel.app';
  private token: string | null = null;

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    const body = {email, password};
    const url = `${this.apiUrl}/api/login`;

    return this.httpClient.post<any>(url, body).pipe(
      tap(res => {
        this.token = res.token;
      })
    );
  }

  getToken() {
    return this.token;
  }

}
