import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { RoomPage } from '../room/room';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';

import * as firebase from 'Firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild(Content) content: Content;

  data = { type:'', nickname:'', message:'' }; // type is data in terms of join or exit from a group.
  chats = [];
  roomkey:string; // setting roomkey to be a type of string.
  nickname:string;
  offStatus:boolean = false;
  imgSrc: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public camera: Camera, public localNotifications: LocalNotifications) {

    this.roomkey = this.navParams.get("key") as string;
     this.nickname = this.navParams.get("nickname") as string;
     this.data.type = 'message';
     this.data.nickname = this.nickname;

     let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
     joinData.set({
       type:'join',
       user:this.nickname,
       message:this.nickname+' has joined this room.',
       sendDate:Date()
     });
     this.data.message = '';

     firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {
       this.chats = [];
       this.chats = snapshotToArray(resp);
       setTimeout(() => {
         if(this.offStatus === false) {
           this.content.scrollToBottom(300);
         }
       }, 1000);
     });
  }

  sendMessage() {
  let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
  newData.set({
    type:this.data.type,
    user:this.data.nickname,
    message:this.data.message,
    sendDate:Date()
  });
  // Send content of message.
  this.data.message = '';
  // Send Local Notification
  this.localNotifications.schedule({
  id: 1,
  title: 'Message Successfully Sent',
  text: 'this.data.message',
  });
}



  takePicture(){

  const options : CameraOptions = {
  quality: 80,
  destinationType: this.camera.DestinationType.FILE_URI,
  sourceType: this.camera.PictureSourceType.CAMERA,
  mediaType: this.camera.MediaType.PICTURE,
  encodingType: this.camera.EncodingType.JPEG,
  cameraDirection: this.camera.Direction.BACK,
  targetWidth: 300,
  targetHeight: 400,
  saveToPhotoAlbum: false
};

  this.camera.getPicture(options).then((imageUri) => {
    this.imgSrc = 'data:image/jpeg;base64,' + imageUri;
  });

}


exitChat() {
  let exitData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
  exitData.set({
    type:'exit',
    user:this.nickname,
    message:this.nickname+' has exited this room.',
    sendDate:Date()
  });

  this.offStatus = true;

  this.navCtrl.setRoot(RoomPage, {
    nickname:this.nickname
  });
}

}


export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
