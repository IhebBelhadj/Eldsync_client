import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent  implements OnInit {
  itemForm: FormGroup;
  status: SelectItem[] = [];
  categories: SelectItem[] = [];
  selectedDrop: SelectItem = { value: '' };

  
  constructor(private formBuilder: FormBuilder,private inventoryService: InventoryService, private router: Router) {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
      expiryDate: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categories = [
      { label: 'MEDICATION', value: 'MEDICATION' },
      { label: 'EQUIPMENT', value: 'EQUIPMENT' },
      { label: 'SUPPLIES', value: 'SUPPLIES' },
    ];
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.inventoryService.addItem(this.itemForm.value).subscribe({
        next: (item) => {
          console.log('Item added successfully', item);
          this.router.navigate(['/uikit/inventory']); 
        },
        error: (error) => {
          console.error('Error adding the item', error);
        }
      });
    }
  }
  


  goBack(): void {
    this.router.navigate(['/uikit/inventory']);
  }
}


