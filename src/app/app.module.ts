import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Import des components MaterialAngular*/
import { MaterialModule } from './shared/material/material.module'

/* Les Components*/
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ListComponent } from './board/list/list.component';
import { CardComponent } from './board/card/card.component';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component'
import { ContactUpdateFormComponent } from './contact/contact-update-form/contact-update-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

/* Les interceptors dans l'ordre */
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { ApiInterceptor } from './shared/interceptors/api.interceptor';
import { ErrorsInterceptor } from './shared/interceptors/errors.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ListComponent,
    CardComponent,
    ContactListComponent,
    ContactFormComponent,
    LoginFormComponent,
    ContactComponent,
    ContactUpdateFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    /* Import des components MaterialAngular*/
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
