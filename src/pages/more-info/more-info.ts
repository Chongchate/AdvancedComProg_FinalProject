import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyDataProvider } from '../../providers/my-data/my-data';
import { Observable } from 'rxjs';
import { Pokemon } from '../../models/data.model';
import { Chart} from 'chart.js';
declare var google;
/**
 * Generated class for the MoreInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more-info',
  templateUrl: 'more-info.html',
})
export class MoreInfoPage {
  public pokemon$: Observable<Pokemon>;
  res=[];
  doughnutChart: any;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  constructor(public myDataProvider: MyDataProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  //showStat(){
    //console.log("start");
    //return this.pokemon$=this.myDataProvider.getStat();
  //}
 
  ionViewDidLoad(){
    console.log("Show");
    this.myDataProvider.getStats(this.res);
  }
  moreInfo(){
    window.open("https://www.pokemon.com/us/")
  }

  displayChart(){
    console.log("Show Chart");
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Water', 'Normal', 'Grass', 'Bug', 'Psychic', 'Fire',
        'Electric', 'Rock', 'Ground',"Ghost","Dragon","Dark","Poison","Fighting","Steel","Ice","Fairy","Flying"],
        datasets: [{
          data: [114,98,70,69,57,53,50,44,32,32,32,31,28,27,27,25,18,4],
          backgroundColor: [
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(229, 0, 255, 0.8)',
            'rgba(0, 255, 127, 0.8)',
            'rgba(255, 233, 0, 0.8)',
            'rgba(0, 182, 255, 0.8)',
            'rgba(180, 130, 200, 0.8)'
          ],
        }]
      },
      options:{
        responsive: true,
        legend: {
          display: true,
          position: "right",
          labels: {
            
          }
        }
      }
    });
  }
  showChart(){
    var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
  }
  
}
