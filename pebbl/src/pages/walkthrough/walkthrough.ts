import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Nav } from 'ionic-angular';
import { HomePage } from '../home/home';
/*
  Generated class for the Walkthrough page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-walkthrough',
  templateUrl: 'walkthrough.html'
})
export class WalkthroughPage {

  lastSlide = false;

  @ViewChild('slider') slider: Slides;

  constructor(public nav: NavController) {}

    skipIntro() {
    // You can skip to main app
    // this.nav.setRoot(TabsNavigationPage);

    // Or you can skip to last slide (login/signup slide)
    // this.lastSlide = true;
    // this.slider.slideTo(this.slider.length());

    this.nav.setRoot(HomePage);
  }

  onSlideChanged() {
    // If it's the last slide, then hide the 'Skip' button on the header
    this.lastSlide = this.slider.isEnd();
  }

  goToLogin() {
    this.nav.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalkthroughPage');
  }

}