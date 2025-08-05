import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject} from '@angular/core';

import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trips';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})

export class TripData {
  
	constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) {}
	baseUrl = 'http://localhost:3000/api';
	url = 'http://localhost:3000/api/trips';

	getTrips(): Observable<Trip[]> {
		return this.http.get<Trip[]>(this.url);
	}

	addTrip(formData: Trip) : Observable<Trip> {
		return this.http.post<Trip>(this.url, formData);
	}

	getTrip(tripCode: string) : Observable<Trip[]> {
		//coonsole.log('Inside TripDataService::getTrip');
		return this.http.get<Trip[]>(this.url + '/' + tripCode);
	}

	updateTrip(formData: Trip) : Observable<Trip> {
		//console.log('Inside TripDataService::addTrip');
		return this.http.put<Trip>(this.url + '/' + formData.code, formData);
	}

	// Call to /login, return JWT
	login(user: User, passwd: string) : Observable<AuthResponse> {
		//console.log('Inside TripData::login');
		return this.handleAuthAPICall('login', user, passwd);
	}

	// Call to /register, create and return JWT
	register(user: User, passwd: string) : Observable<AuthResponse> {
		//console.log('Inside TripData::register');
		return this.handleAuthAPICall('register', user, passwd);
	}

	//Helper method for login and register
	handleAuthAPICall(endpoint: string, user: User, passwd: string) : Observable<AuthResponse> {
		// console.log('Inside TripData::handleAuthAPICall');
		let formData = {
			name: user.name,
			email: user.email,
			password: passwd
		};

		return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
	}
}
