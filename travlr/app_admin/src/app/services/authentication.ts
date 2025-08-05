import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from '../services/trip-data';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
	//Setup storage and services
	constructor(
		@Inject(BROWSER_STORAGE) private storage: Storage,
		private tripData: TripData
	) {}

	// Handle auth response
	authResp: AuthResponse = new AuthResponse();

	// Get token form storage provider
	public getToken(): string {
		let out: any;
		out = this.storage.getItem('travlr-token');

		if(!out)
		{
			return '';
		}
		return out;
	}

	//Save token to storage provider
	public saveToken(token: string): void {
		this.storage.setItem('travlr-token', token);
	}

	//Remove JWT from storage and logout
	public logout(): void {
		this.storage.removeItem('travlr-token');
	}

	// Check if valid login token is present
	public isLoggedIn(): boolean {
		const token: string = this.getToken();
		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]));
			return payload.exp > (Date.now() / 1000);
		} else {
			return false;
		}
	}

	// Retrieve current user. Only call after isLoggedIn
	public getCurrentUser(): User {
		const token: string = this.getToken();
		const { email, name } = JSON.parse(atob(token.split('.')[1]));
		return { email, name } as User;
	}

	// Use login method from tripData, which returns an observable
	// Subscribe to return value and process once observable is satisfied
	public login(user: User, passwd: string) : void {
		this.tripData.login(user,passwd).subscribe({
			next: (value: any) => {
				if(value)
					{
						console.log(value);
						this.authResp = value;
						this.saveToken(this.authResp.token);
					}
			},
			error: (error: any) => {
				console.log('Error: ' + error);
			}
		})
	}

	// Use register method from tripData, which returns observable
	// Subscribe to return value and process once observable is satisfied
	public register(user: User, passwd: string) : void {
		this.tripData.register(user,passwd).subscribe({
			next: (value: any) => {
				if(value)
					{
						console.log(value);
						this.authResp = value;
						this.saveToken(this.authResp.token);
					}
			},
			error: (error: any) => {
				console.log('Error: ' + error);
			}
		})
	}
}
