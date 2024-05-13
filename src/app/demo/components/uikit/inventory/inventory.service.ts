import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item';
import { ItemHistory } from './item-history';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {



  private itemUrl = 'http://localhost:8081/api/EldSync/Inventory';

  constructor(private http: HttpClient) {}

  
  
  public retrieveAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemUrl}/retrieveAllItems`);
  }


public retrieveAllItemsForChart(): Observable<Item[]> {
  return this.http.get<Item[]>(`${this.itemUrl}/retrieveAllItems`);
}

  public addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.itemUrl}/addItem`, item);
  }  

  public getItemDetails(id: number): Observable<any> {
    return this.http.get(`${this.itemUrl}/getItemDetails/${id}`);
  }

  public removeItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.itemUrl}/removeItem/${id}`);
  }

  updateItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.itemUrl}/updateItem/${id}`, item);
  }


  public removeItemLog(historyId: number): Observable<void> {
    return this.http.delete<void>(`${this.itemUrl}/removeItemLog/${historyId}`);
  }


  public getAllItemHistory(): Observable<ItemHistory[]> {
    return this.http.get<ItemHistory[]>(`${this.itemUrl}/items/history`);
  }
  
  
  public restoreItem(idarchive: number): Observable<Item> {
    return this.http.post<Item>(`${this.itemUrl}/restore/${idarchive}`, null);
  }


  



}
