import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as firebase from 'firebase';
import { IconSetService } from '@coreui/icons-angular';
import { cilUser } from '@coreui/icons';
import { UUID } from 'angular2-uuid';

// const config={
//   apiKey: "AIzaSyDJvnUqXxUIXY8Zt1GyYr00XqCV-6gDBFw",
//   authDomain: "mirror-a1029.firebaseapp.com",
//   databaseURL: "https://mirror-a1029-default-rtdb.firebaseio.com",
//   projectId: "mirror-a1029",
//   storageBucket: "mirror-a1029.appspot.com",
//   messagingSenderId: "764053401133",
//   appId: "1:764053401133:web:102788caea87b987fc12a4",
//   measurementId: "G-8HEB0YFQ2B"
// };

const config={
  apiKey: "AIzaSyAw3K6lDBs0POOqZuappVZn2AX41oiJOjQ",
  authDomain: "mirror-chat-16203.firebaseapp.com",  
  databaseURL: "https://mirror-chat-16203-default-rtdb.firebaseio.com",
  projectId: "mirror-chat-16203",
  storageBucket: "mirror-chat-16203.appspot.com",
  messagingSenderId: "290023261627",
  appId: "1:290023261627:web:eb6d7f3e5d9370be22309e"
};

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})

export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public iconSet: IconSetService,
    

  ) {
    // iconSet singleton
    iconSet.icons = { cilUser };
    firebase.initializeApp(config);
   
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
