import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomPage } from '../room/room';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  data = { nickname: "" };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  enterNickname() {
    this.navCtrl.setRoot(RoomPage, {
      nickname: this.data.nickname
    });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
