import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Item } from '../item';

@Component({
  selector: 'app-low-inventory-alert-items',
  templateUrl: './low-inventory-alert-items.component.html',
  styleUrl: './low-inventory-alert-items.component.scss'
})
export class LowInventoryAlertItemsComponent  implements OnChanges {

  @Input() lowInventoryItems: Item[] = [];
  @Output() close = new EventEmitter<void>();

  display: boolean = false;

  constructor(private inventoryService: InventoryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lowInventoryItems']) {
      const currentValue = changes['lowInventoryItems'].currentValue;
      this.display = currentValue && currentValue.length > 0;
    }
  }

  closeModal(): void {
    this.display = false;
    this.close.emit();
  }
}
