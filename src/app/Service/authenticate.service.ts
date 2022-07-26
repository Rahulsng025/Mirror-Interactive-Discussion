import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { Data } from '../Models/data';
import { FacebookData } from '../Models/facabookData';
// Google Auth
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { MirrorService } from '../Service/mirror.service';

//Facebook Auth


export class Users {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  userData: any;
  user$: Observable<Data>;
  facebookUser$: Observable<FacebookData>;

  constructor(public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public http: HttpClient,
    public mirrorService: MirrorService) { 

      //get the email auth state, then fetch the firebase user document or return null
      this.afAuth.authState.subscribe((user)=>{
        if(user){
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user') || '{}');
        }
        else {
          localStorage.setItem('user', null!);
          JSON.parse(localStorage.getItem('user') || '{}');
        }
      });

      //get the google auth state, then fetch the firebase user document or return null 
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user =>{
          //logged in
          if(user) {
            return this.afs.doc<Data>(`users/${user.uid}`).valueChanges();
          }
          else {
            //logged out
            return of(null)
          }
        })
      )

      //get the facebook auth state, then fetch the firebase user document or return null
        this.facebookUser$ = this.afAuth.authState.pipe(
          switchMap(user =>{
            if(user) {
              return this.afs.doc<FacebookData>(`users/${user.uid}`).valueChanges();
            }
            else {
              return of(null)
            }
          })
        )
    }
  
    SignIn(email: any, password: any){
      this.http.post<any>('http://mirror.shreddersbay.com/mirror/public/api/auth/login',{
        email:email,
        password: password
      }).subscribe(res=>{
        console.log(res)
        this.mirrorService.storeUserData(res.success.token);
      })
      return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) =>{
        this.ngZone.run(()=>{
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error)=>{
        window.alert(error.message);
      });
    }


  SignUp(name:any, email:any, password:any){
    this.http.post<any>('http://mirror.shreddersbay.com/mirror/public/api/auth/signup',{
      name:name,
      email:email,
      password:password
    }).subscribe(res=>{
      console.log(res)
    });
    return this.afAuth.createUserWithEmailAndPassword(email,password)
    .then((result)=>{
      this.SendVerificationMail();
      this.SetUserData(result.user);
    })
    .catch((error)=>{
      window.alert(error.message)
    });
  }

  SendVerificationMail(){
    return this.afAuth.currentUser
    .then((user: any)=>{
      return user.sendEmailVerification();
    })
    .then(()=>{
      this.router.navigate(['verify-email-address']) 
    });
  }

  //Reset Password Method
  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user:any){
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  SignOut(){
    return this.afAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['login-form']);
    })
  }

  // Check user login for email verification auth
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null && user.emailVerified !== false ? true : false;
  }

  //Google sign in
  async googleSignin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['dashboard'])
    return this.updateUserData(credential.user);
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<Data> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data, {merge: true})
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['login-form']);
  }

  async facebookAuth(){
    const provider = new firebase.auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider)
    this.router.navigate(['dashboard']);
    return this.facebookData(credential.user);
  }

  //Facebook Signup
  //   facebookAuth(){
  //   const provider = this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  //   return this.facebookData(provider.user);
  // }

  private facebookData(user){
    const userRef: AngularFirestoreDocument<FacebookData> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data, {merge: true})
  }

  // AuthLogin(provider){
  //   return this.afAuth.signInWithPopup(provider)
  //   .then((result)=>{
  //     console.log('You have been successfully logged in');
  //     this.router.navigate(['dashboard'])
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //   });
  // }
  
}

