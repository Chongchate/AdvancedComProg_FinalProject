import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Pokemon } from '../../models/data.model';

/*
  Generated class for the MyDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyDataProvider {
  private url="http://096b8753d326.ngrok.io"

  constructor(public http: HttpClient) {
    console.log('Hello MyDataProvider Provider');
  }
  getData(itemlist,id,event){
    console.log("I'll get the data");
    this.http.get(this.url+"/showdata?id="+id).subscribe(data => {
      for (let i=0;i<data.data.length;i++)
        itemlist.push(data.data[i]);
      if(id != 0)
        event.complete();
    })
  }  
  getResult(name1,name2,result){
    this.http.get(this.url+"/versus?name1="+name1+"&name2="+name2).subscribe(data => {
      console.log(data)
      result.push(data);
    })
  }
  findPoke(name: string){
    console.log(this.url+"/findpoke?name="+name);
    return this.http.get<Pokemon>(this.url+"/findpoke?name="+name);
  }
  //getStat(){
    //console.log(this.url+"/stats");
    //return this.http.get<Pokemon>(this.url+"/stats");
  //}
  getStats(output){
    console.log(this.url+"/stats");
    this.http.get(this.url+"/stats").subscribe(data =>{
      console.log(data)
      output.push(data);
    })
  }
}
