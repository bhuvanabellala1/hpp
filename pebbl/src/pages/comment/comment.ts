import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { MemoryService } from '../../providers/memory-service';
import { MemoryWithKey, CommentModel } from '../timeline/timeline.model'

/*
Generated class for the Comment page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
  providers: [MemoryService]
})
export class CommentPage {

  public commentText: any;
  private userId :any;
  private memory: MemoryWithKey;
  private comments: Array<CommentModel>;
  private usersMemoryNode: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private memoryService: MemoryService) {
      this.userId = firebase.auth().currentUser.uid;
      this.commentText = "";
      this.memory = this.navParams.get('mem');
      this.usersMemoryNode = firebase.database().ref('user-memories');
    }


    ionViewDidLoad() {
      console.log('ionViewDidLoad CommentPage');
      this.loadComments();
    }

    loadComments(){
      let that = this;
      this.usersMemoryNode.child(this.userId).child('memories').child(this.memory.memKey).on('value', function(snapshot){
        that.comments = snapshot.val().comment;
        // console.log(that.comments);
      })


    }

    sendMessage(){
      console.log("sending message");
      if(this.commentText != ""){
        this.memoryService.sendMessage(this.userId, this.commentText, this.navParams.get("mem").memKey);
        this.commentText = "";
      }
    }

  }
