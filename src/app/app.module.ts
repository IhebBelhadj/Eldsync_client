import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { PhotoService } from './demo/service/photo.service';

import {AppConfigComponent} from "./layout/config/app.config.component";
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CheckboxModule } from 'primeng/checkbox';

import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    HttpClientModule,
    GraphQLModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    CheckboxModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    CountryService,
    CustomerService,
    EventService,
    IconService,
    PhotoService,
    ProductService,
    MessageService
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
