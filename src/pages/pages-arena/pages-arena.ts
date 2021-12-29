import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyDataProvider } from '../../providers/my-data/my-data';

/**
 * Generated class for the PagesArenaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-arena',
  templateUrl: 'pages-arena.html',
})
export class PagesArenaPage {
  viewResult:any;
  name1:string;
  name2:string;
  data=[];


  constructor(public navCtrl: NavController, public navParams: NavParams,public myDataProvider: MyDataProvider) {
  }

  buttonClick(){
    this.myDataProvider.getResult(this.name1,this.name2,this.data);
    
  }

}
