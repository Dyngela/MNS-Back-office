import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {StoreService} from "../../core/services/store.service";
import { Chart, registerables } from 'chart.js';
import {FormControl} from '@angular/forms' ;
import {Store} from "../../core/model/Store";

Chart.register(...registerables);

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit{

  stores : Store[] = [];
  chart: any;
  caChartLabels: any;
  caChartData: any;
  selectedStore : any;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadStoresNames();
    var labelsStore2 : string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    var dataStore2 : any[] = [8234.32, 10476.12, 12908.87, 24675.73, 16456.98, 18428.45, 19234.32, 16476.12, 14908.87, 24675.73, 22456.98, 20428.45];

    this.createCAEvolutionChart(labelsStore2, dataStore2);
  }

  loadStoresNames(){
    this.storeService.getAll().subscribe({
      next: (data) => {
        this.stores = data
        console.log(data)
      }
    })
  }

  createCAEvolutionChart(dataLabels : string[], dataValues : any[]){
    var myChart = new Chart("CAEvolutionChart", {
      type: 'line',
      data: {
          labels: dataLabels,
          datasets: [{
              label: 'CA (euros)',
              data: dataValues,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'CA (euros)'
                }
            },
            x: {
              title: {
                display: true,
                text: 'Mois'
              }
            }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
              display: true,
              text: 'Evolution du chiffre d"affaire sur l"année 2023',
              padding: {
                  top: 10,
                  bottom: 30
              }
          }
        }
      }
    });
  }
}

