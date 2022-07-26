import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { AuthenticateService } from '../../Service/authenticate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(public authService: AuthenticateService){

  }

  ngOnInit(): void {
   
  }

  onLogout(){
    this.authService.SignOut();
    this.authService.signOut();
  }
}
