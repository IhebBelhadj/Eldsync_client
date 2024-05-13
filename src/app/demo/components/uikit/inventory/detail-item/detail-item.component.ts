import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrl: './detail-item.component.scss'
})
export class DetailItemComponent implements OnInit {
  item: any; 

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getItemById();
  }

  getItemById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.inventoryService.getItemDetails(id).subscribe(
      item => {
        console.log('null');

        this.item = item;
      },
      error => {
        console.error('Error fetching item:', error);
      }
    );
    
  }

  goBack(): void {
    this.router.navigate(['/uikit/inventory']);
  }

}
