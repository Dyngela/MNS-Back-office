import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {StoreService} from "../../core/services/store.service";
import { Store } from '../store-creation/store-creation.component';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit{

  stores : Store[] = [];
  public chart: any;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadStoresNames();
    this.createChart();
  }

  loadStoresNames(){
    this.storeService.getAll().subscribe({
      next: (data) => {
        this.stores = data
        console.log(data)
      }
    })
  } 
  selected = "----"

  update(e : any){
    this.selected = e.target.value
  }

  createChart(){
    var myChart = new Chart("CAEvolutionChart", {
      type: 'line',
      data: {
          labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
          datasets: [{
              label: 'CA (euros)',
              data: [9234.32, 10476.12, 12908.87, 24675.73, 16456.98, 18428.45],
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

