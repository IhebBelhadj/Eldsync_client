import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from './inventory.service';
import { Item } from './item';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {
  
  items: Item[] = [];
  searchLocation: string = '';
  filteredItems: Item[] = [];
  itemsPerPage: number = 5; 
  perPageOptions: number[] = [1, 5, 10, 20, 50];
  lowInventoryItems: any[] = [];
showLowInventoryModal: boolean = false;
display: boolean = false; 







  constructor(private inventoryService: InventoryService,private router: Router) {}

  ngOnInit(): void {
    this.getItems();
    this.display = true; 

  
  }

  getItems(): void {
    this.inventoryService.retrieveAllItems().subscribe(items => {
      this.items = items.slice(0, this.itemsPerPage);  
      this.checkLowInventoryLevels();
      this.showLowInventoryAlert(); 

      this.filterItems();

    });
  }

  checkLowInventoryLevels(): void {
    const lowInventoryThreshold = 5;
    this.lowInventoryItems = this.items.filter(item => item.quantity < lowInventoryThreshold);
  }
 
  showLowInventoryAlert(): void {
    this.checkLowInventoryLevels();
    if (this.lowInventoryItems.length > 0) {
      this.showLowInventoryModal = true;
    }/* 
     else {
      alert("No low inventory items detected."); 
    }*/
  }





  onItemsPerPageChange(): void {
    this.getItems(); 
  }

refreshItems(): void {
  this.searchLocation = ''; 
  this.getItems(); 
}






  filterItems(): void {
    console.log('Search Location:', this.searchLocation);
    if (this.searchLocation.trim() === '') {
      this.filteredItems = this.items; 
    } else {
      this.filteredItems = this.items.filter(item => item.category.includes(this.searchLocation));
    }
    console.log('Filtered Items:', this.filteredItems);
  }
  

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryService.removeItem(id).subscribe(
        () => {
          console.log('Item deleted successfully.');
          this.getItems(); 
        },
        (error) => {
          console.error('Error removing item:', error);
        }
      );
    
    }

    
  }

  updateItem(itemId: number) {
    this.router.navigate(['/uikit/inventory/UpdateItem', itemId]);
  }


  goToAdd(): void {
    this.router.navigate(['/uikit/inventory/AddItem']);
  }

  goToLogs(): void {
    this.router.navigate(['/uikit/inventory/LogsItem']);
  }

  viewItem(itemId: number) {
    this.router.navigate(['/uikit/inventory/DetailItem', itemId]);
  }

  goToStat(): void {
    this.router.navigate(['/uikit/inventory/StatsItem']);
  }

  
  

}
