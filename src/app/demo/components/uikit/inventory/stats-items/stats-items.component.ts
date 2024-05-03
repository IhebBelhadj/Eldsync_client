import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-stats-items',
  templateUrl: './stats-items.component.html',
  styleUrls: ['./stats-items.component.scss']
})
export class StatsItemsComponent implements OnInit {
  chartData: any;
  totalBudget: number = 0;
  totalItems: number = 0;
  nextExpiryItem: { name: string, expiryDate: Date | string } = { name: '', expiryDate: '' };
  
  chartOptions: any = {
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    }
  };

  constructor(private inventoryService: InventoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.inventoryService.retrieveAllItemsForChart().subscribe(items => {
      const labels = items.map(item => item.name);
      const quantities = items.map(item => item.quantity);
      const colors = quantities.map((_, index) => this.getDistinctColor(index, quantities.length));

      this.totalItems = items.length;
      this.totalBudget = items.reduce((acc, item) => acc + item.unitPrice, 0);
      
      // Trouver l'article qui expire le premier
      let earliestExpiryDate = new Date(Math.min(...items.map(item => new Date(item.expiryDate).getTime())));
      let earliestExpiryItem = items.find(item => new Date(item.expiryDate).getTime() === earliestExpiryDate.getTime());
    
      if (earliestExpiryItem) {
        this.nextExpiryItem.name = earliestExpiryItem.name;
        this.nextExpiryItem.expiryDate = earliestExpiryDate; 
      }

      this.chartData = {
        labels: labels,
        datasets: [
          {
            data: quantities,
            backgroundColor: colors,
            hoverBackgroundColor: colors
          }
        ]
      };
    });
  }

  getDistinctColor(index: number, total: number): string {
    const hueStep = 360 / total;
    const hue = Math.floor(index * hueStep) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  }

  goBack(): void {
    this.router.navigate(['/uikit/inventory']);
  }
}
