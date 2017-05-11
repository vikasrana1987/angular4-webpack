import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { User } from '../_models/index';
let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string): Observable<User[]> {
        return this.http.post('http://localhost:8090/api/authenticate', JSON.stringify({ username: username, password: password }), options)
            .map(this.loginResponse)
            .catch(this.handleServerError);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    loggedIn() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        return false;
    }
    private loginResponse(response: Response) {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
    }

    private handleServerError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        try {
            if (error instanceof Response) {
                const body = error.json() || 'Server error';
                const err = body.error || body;
                errMsg = err;
            } else {
                errMsg = error.message ? error.message : error.toString();
            }
        } catch (e) { errMsg = error._body; }
        return Observable.throw(errMsg);
    }
}
