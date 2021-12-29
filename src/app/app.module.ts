import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PagesArenaPage } from '../pages/pages-arena/pages-arena';
import { MoreInfoPage } from '../pages/more-info/more-info';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MyDataProvider } from '../providers/my-data/my-data';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    MyApp,
    HomePage,PagesArenaPage,MoreInfoPage,TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,PagesArenaPage,MoreInfoPage,TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyDataProvider
  ]
})
export class AppModule {}
