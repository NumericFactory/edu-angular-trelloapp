import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/shared/models/contact.model';
import { ContactService } from 'src/app/shared/services/contact.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-contact-update-form',
  templateUrl: './contact-update-form.component.html',
  styleUrls: ['./contact-update-form.component.scss']
})
export class ContactUpdateFormComponent implements OnInit {

  updateContactForm: FormGroup;
  contactId: number;
  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contactService: ContactService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.params.id;
    this.contactService.getContactFromApi(this.contactId);

    this.contactService.contact$.subscribe(contactResponseFromApi => {
      this.updateContactForm = this.fb.group({
        first: [contactResponseFromApi.first, Validators.minLength(2)],
        last: [contactResponseFromApi.last, Validators.minLength(2)],
        email: [contactResponseFromApi.email, Validators.email],
        phone: [contactResponseFromApi.phone, Validators.required]
      })

    })

  }

  onSubmit(contactId: number, form: FormGroup) {
    console.log(form)
    console.log(form.get('first').hasError('minlength'));
    console.log(form.value);
    if (form.status === 'VALID') {
      console.log('Ok valid');
      this.contactService.updateContactToApi(contactId, form.value);
    }
  }

}
