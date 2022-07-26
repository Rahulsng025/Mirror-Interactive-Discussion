import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/Service/authenticate.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authService: AuthenticateService) { }

  ngOnInit(): void {
  }

}
