import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ComicPage } from '../pages/comic/comic';
import { CharacterPage } from '../pages/character/character';
import { SeriePage } from '../pages/serie/serie';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComicServiceProvider } from '../providers/comic-service/comic-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ComicPage,
    CharacterPage,
    SeriePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ComicPage,
    CharacterPage,
    SeriePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ComicServiceProvider
  ]
})
export class AppModule {}
