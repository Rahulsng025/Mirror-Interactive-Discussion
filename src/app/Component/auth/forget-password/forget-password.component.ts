import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/Service/authenticate.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(public authService: AuthenticateService) { }

  ngOnInit(): void {
  }

}
