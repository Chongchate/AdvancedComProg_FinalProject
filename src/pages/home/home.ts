import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PagesArenaPage } from '../pages-arena/pages-arena';
import { MoreInfoPage } from '../more-info/more-info';
import { MyDataProvider } from '../../providers/my-data/my-data';
import { Observable } from 'rxjs';
import { Pokemon } from '../../models/data.model';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  itemListData =[];
  pageNumber=0;
  public name: string;
  data=[];
  public pokemon$: Observable<Pokemon>;
  
  constructor(public navCtrl: NavController,public myDataProvider: MyDataProvider) {

  }
  ionViewDidLoad(){
    this.myDataProvider.getData(this.itemListData,0,"");
  }
  doInfinite(event){
    this.pageNumber++;
    this.myDataProvider.getData(this.itemListData,this.pageNumber*20,event);
  }
  search(poke: string){
    console.log("start");
    this.pokemon$=this.myDataProvider.findPoke(poke);
    console.log("FIn");
  }
}
