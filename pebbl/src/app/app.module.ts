import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LegalPage } from '../pages/legal/legal';
import { ProfilePage } from '../pages/profile/profile';
import { PebblPage } from '../pages/pebbl/pebbl';
import { FaqPage } from '../pages/faq/faq';
import { CheckinPage } from '../pages/checkin/checkin';
import { TimelinePage } from '../pages/timeline/timeline';
import { AdventuresPage } from '../pages/adventures/adventures';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { LoginPage } from '../pages/login/login'
import { RegisterPage } from '../pages/register/register';
import { DevicePage } from '../pages/device/device';
import { MemoryslidesPage } from '../pages/memoryslides/memoryslides';
import { VenuePage } from '../pages/venue/venue';
import { TestImagePage } from '../pages/test-image/test-image';
import { SecondregsiterPage } from '../pages/secondregsiter/secondregsiter';

import { FirebaseAuthPagePage } from '../pages/firebase-auth-page/firebase-auth-page';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';

//import services
import { TimelineService } from '../pages/timeline/timeline.service';
import { MemoryService } from '../providers/memory-service';
import { UsersService } from '../providers/users-service';
import { CheckinService } from '../providers/checkin-service';
import { ConnectivityService } from '../providers/connectivity-service';
import { Locations } from '../providers/locations';
import { GoogleMaps } from '../providers/google-maps';
import { SMS } from '@ionic-native/sms';

import { BackgroundMode } from '@ionic-native/background-mode';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LegalPage,
    ProfilePage,
    PebblPage,
    FaqPage,
    CheckinPage,
    TimelinePage,
    AdventuresPage,
    BluetoothPage,
    DevicePage,
    FirebaseAuthPagePage,
    WalkthroughPage,
    LoginPage,
    RegisterPage,
    MemoryslidesPage,
    VenuePage,
    SecondregsiterPage,
    TestImagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LegalPage,
    ProfilePage,
    PebblPage,
    FaqPage,
    CheckinPage,
    TimelinePage,
    AdventuresPage,
    BluetoothPage,
    DevicePage,
    FirebaseAuthPagePage,
    WalkthroughPage,
    LoginPage,
    RegisterPage,
    MemoryslidesPage,
    VenuePage,
    SecondregsiterPage,
    TestImagePage
  ],
  providers: [
    TimelineService,
    UsersService,
    CheckinService,
    ConnectivityService,
    Locations,
    GoogleMaps,
    BackgroundMode,
    MemoryService,
    SMS
  ]
  // providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
