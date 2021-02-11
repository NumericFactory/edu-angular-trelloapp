import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from '../../shared/models/contact.model';
import { ContactService } from '../../shared/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  // Variable d'affichage
  allContacts: Contact[];
  contacts: Contact[];

  constructor(private contactService: ContactService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // request HTTP à /contacts
    this.contactService.getContactsFromApi();
    // subscribe à un subject contacts$;
    this.contactService.contacts$.subscribe(data => {
      this.allContacts = data;
      this.contacts = [...this.allContacts];
    });
  }

  /**
   * Filters contacts
   * 
   * Filter contacts by first, last, email, phone, first+last
   * @param searchText 
   */
  filterContacts(searchText: string): void {
    searchText = searchText.toLowerCase();
    this.contacts = this.allContacts.filter(contact =>
      contact.first.toLowerCase().includes(searchText) ||
      contact.last.toLowerCase().includes(searchText) ||
      contact.email.toLowerCase().includes(searchText) ||
      contact.phone.toLowerCase().includes(searchText) ||
      (contact.first.toLowerCase() + ' ' + contact.last.toLowerCase()).includes(searchText)
    );
  }

  deleteContactAction(ev, contactId: number) {
    ev.stopPropagation();
    if (confirm('Supprimer ce conctact?')) {
      this.contactService.deleteContactInApi(contactId);
    }
  }

  show(message, action) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
