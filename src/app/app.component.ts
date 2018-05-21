import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { SigninPage } from '../pages/signin/signin';

const config = {
  apiKey: 'AAAACPIpZ3E:APA91bG22iZBxDw4_7zFXDOM3AtZUh1saiCKk2VbskHU2eefyUFobAogwxvnNJk2PEjL_WHKuw18plhrImCxwpijFPmUzEhYp2d17Dq049qrw86uHcRCrV4f958GKEtn2UMTcSF74FI1',
  authDomain: 'chatapp-f2f6c.firebaseapp.com',
  databaseURL: 'https://chatapp-f2f6c.firebaseio.com',
  projectId: 'chatapp-f2f6c',
  storageBucket: 'gs://chatapp-f2f6c.appspot.com',
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
    // Inits firebase app with config settings outlined above -> now ready to be populated with data.
  }
}
