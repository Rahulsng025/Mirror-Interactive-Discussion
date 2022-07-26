import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthenticateService } from '../Service/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticateService,
    private router: Router){

  }
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // For Email login 
      {
        if(this.authService.isLoggedIn !== true) {
          this.router.navigate(['login-form'])
        }
        // For google login 
      this.authService.user$.pipe(
      take(1),
      map(user => !user),
      tap(loggedIn =>{
        if(!loggedIn){
          console.log('Access denied')
          this.router.navigate(['login-form']);
        }
      })
    )
      }
        return true;
   
    

 
  }
  
}
