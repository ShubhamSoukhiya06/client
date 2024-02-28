import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { City } from '../../model/City';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  citiesUrl = environment.apiUrl + '/cities';
  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    const token = 'AnhKLIqw45rtz!1lok5!'; // Retrieve token from local storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get(this.citiesUrl, { headers }) // Specify expected type for better type safety
      .pipe(
        map((response: any) => response.cities as City[]), // No need for unnecessary type casting with correct typing
        catchError((error) => {
          console.error('An error occurred while fetching cities:', error);
          return []; // Return an empty array in case of error
        })
      );
  }
}
