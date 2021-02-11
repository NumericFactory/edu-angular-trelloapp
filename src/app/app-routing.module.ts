import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactUpdateFormComponent } from './contact/contact-update-form/contact-update-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  { path: '', component: BoardComponent },
  {
    path: 'contacts',
    children: [
      { path: '', component: ContactListComponent },
      { path: 'add', component: ContactFormComponent },
      { path: 'update/:id', component: ContactUpdateFormComponent },
    ]
  },

  { path: 'login', component: LoginFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
