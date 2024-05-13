import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { InventoryService } from '../inventory.service';
import { ItemHistory } from '../item-history';


@Component({
  selector: 'app-logs-items',
  templateUrl: './logs-items.component.html',
  styleUrl: './logs-items.component.scss'
})
export class LogsItemsComponent implements OnInit {
  items: ItemHistory[] = [];
  searchLocation: string = '';
  filteredItems: ItemHistory[] = [];
  itemsPerPage: number | string = 5;  
  perPageOptions:  (number | string)[]  = [1, 5, 10, 20, 50, "All"];



  
  constructor(private inventoryService: InventoryService,private router: Router) {}

  ngOnInit(): void {
    this.getItemsHistory();
  }

  exportToExcel(): void {
    const dataToExport = this.filteredItems.map(item => ({
      HistoryID: item.historyId,
      action: item.action,
      timestamp: item.timestamp,
      details: item.details,
      itemId: item.itemId,
    }));
    
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ItemHistory');
    XLSX.writeFile(wb, 'ItemHistory.xlsx');
  }
  

  getItemsHistory(): void {
    this.inventoryService.getAllItemHistory().subscribe(items => {
      if (this.itemsPerPage === "All") {
        this.items = items; 
      } else {
        this.items = items.slice(0, typeof this.itemsPerPage === 'number' ? this.itemsPerPage : parseInt(this.itemsPerPage));
      }
      this.filterItems(); 
    });
  }
  

  onItemsPerPageChange(): void {
    this.getItemsHistory(); 
  }


  refreshItems(): void {
    this.searchLocation = '';
    this.getItemsHistory();
  }
  
  filterItems(): void {
    console.log('Search Location:', this.searchLocation);
    if (this.searchLocation.trim() === '') {
      this.filteredItems = this.items; 
    } else {
      this.filteredItems = this.items.filter(ItemHistory => ItemHistory.action.includes(this.searchLocation));
    }
    console.log('Filtered Items:', this.filteredItems);
  }

  goBack(): void {
    this.router.navigate(['/uikit/inventory']);
  }

  
  restoreItem(idarchive: number): void {
    this.inventoryService.restoreItem(idarchive).subscribe({
      next: (response) => {
        this.router.navigate(['/uikit/inventory']);
      },
      error: (error) => {
        console.error('Error restoring item:', error);
      }
    });
    
  }


  deleteItemLog (historyId: number): void {
    if (confirm('Are you sure you want to delete this Item History?')) {
      this.inventoryService.removeItemLog(historyId).subscribe(
        () => {
          console.log('Item deleted successfully.');
          this.items = this.items.filter((ItemHistory) => ItemHistory.historyId !== historyId);
          this.filterItems(); 
        },
        (error) => {
          console.error('Error removing event:', error);
        }
      );
    }
  }
  

}
