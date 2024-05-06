import { SafeUrl } from '@angular/platform-browser';
import { EventCategory } from './event-category';
import { EventStatus } from './event-status';

export class Event {
  idEvent!: number;
  name!: string;
  description!: string;
  bannerData: string | null;
  bannerUrl?: SafeUrl;
  date!: Date;
  category!: EventCategory;
  location!: string;
  price!: number;
  status!: EventStatus;
  createdAt!: Date;
  updatedAt!: Date;
 /* users!: User[];*/
}


