import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.scss'
})
export class UpdateItemComponent implements OnInit {

  itemForm: FormGroup;
  categories: any[]; // Adjust based on your needs

  constructor(
    private fb: FormBuilder,
    private itemService: InventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories(); 
    
    const itemId = +this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.itemService.getItemDetails(itemId).subscribe({
        next: (data) => {
          this.updateForm(data);
 
        },
        error: (error) => {
          console.error('Error fetching item', error);
        }
      });
    }
  }

  private loadCategories(): void {
    this.categories = [
      { label: 'Medication', value: 'MEDICATION' },
      { label: 'Equipment', value: 'EQUIPMENT' },
      { label: 'Supplies', value: 'SUPPLIES' }
    ];
  }
  
  private updateForm(item: any): void {
    this.itemForm.patchValue({
      id: item.id,
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      expiryDate: item.expiryDate, 
      category: item.category
    });
  }

  initForm(): void {
    this.itemForm = this.fb.group({
      id: [null],
      name: [''],
      description: [''],
      quantity: [null],
      unitPrice: [null],
      expiryDate: [null],
      category: [null]
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      
        const id = this.route.snapshot.params['id'];
        console.log("Extracted ID:", id);

        if (id) {
            this.itemService.updateItem(id, this.itemForm.value).subscribe({
                next: () => {
                    console.log('Item updated successfully');
                    this.router.navigate(['/uikit/inventory']);
                },
                error: (error) => {
                    console.error('Error updating item', error);
                }
            });
        } else {
            console.error('No ID provided for item update.');
        }
    }
}

  
  

  goBack(): void {
    this.router.navigate(['/uikit/inventory']);
  }




}
