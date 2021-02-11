import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ContactService } from '../../shared/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      first: ['', Validators.minLength(2)],
      last: ['', Validators.minLength(2)],
      email: ['', Validators.email],
      phone: ['', Validators.required]
    })
  }

  onSubmit(form) {
    console.log(form)
    console.log(form.get('first').hasError('minlength'));
    console.log(form.value);
    if (form.status === 'VALID') {
      console.log('Ok valid');
      this.contactService.postContactToApi(form.value)
    }
    else {
      this.alertService.show('Oups...Corrigez vos erreurs !');
    }
  }

}
