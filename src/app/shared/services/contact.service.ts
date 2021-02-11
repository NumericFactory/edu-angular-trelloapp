import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts$ = new BehaviorSubject<Contact[]>([]);
  contact$ = new BehaviorSubject<Contact>({ first: '', last: '', phone: '', email: '' });

  constructor(private http: HttpClient, private alertService: AlertService, private router: Router) { }

  /*
    Pour authentifier l'utilisateur lors des reqûetes à l'API: 
    
    On automatise l'ajout du token dans les headers de la requête sortante...
    Grâce aux Intercptors.

    Exemples concrets de besoins d'utilisation des interpetors :
    -> Ajouter automatiquement une clé API ou un token à la reqûete sortante
       (voir ici interceptors/api.interceptor.ts)
    -> Afficher automatiquement un loader
    -> Gérer les erreurs 401/403/405/40X/50X

    Les intercptors sont chaînable et renvoient la requête, 
    - soit à l'intercepteur suivant
    - soit à la destination
    (l'ordre de leur déclaration dans 'app.module.ts' est donc important)
  */


  /**
   * Get contacts from api
   * 
   * endpoint backend : [GET] /contacts
   */
  getContactsFromApi() {
    if (this.contacts$.getValue().length === 0) {
      this.http.get('http://localhost:1337/contacts')
        .subscribe((response: any) => this.contacts$.next(response));
    }
  }

  /**
   * Get contact from api
   * 
   * endpoint backend : [GET] /contacts/:id
   * @param id 
   */
  getContactFromApi(id) {
    this.http.get('http://localhost:1337/contacts/' + id)
      .subscribe((response: any) => {
        this.contact$.next(response);
      });
  }



  /**
   * Create contact to api
   * 
   * endpoint backend : [POST] /contacts
   * @param contactObj 
   */
  postContactToApi(contactObj: Contact) {
    // let headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') })
    this.http.post('http://localhost:1337/contacts', contactObj).subscribe((responseApi: any) => {
      console.log(responseApi);
      if (responseApi.id) {
        // Ajouter le contact dans contacts$
        this.contacts$.next([...this.contacts$.getValue(), responseApi]);
        // Message et navigation vers la page /contacts
        this.alertService.show('contact ajouté');
        this.router.navigate(['/contacts']);
      }
    });
  }


  /**
   * Update contact in api
   * 
   * endpoint backend : [PUT] /contacts/:id
   * @param contactId 
   * @param contactObj 
   */
  updateContactToApi(contactId: number, contactObj: Contact) {
    this.http.put('http://localhost:1337/contacts/' + contactId, contactObj).subscribe(
      (responseApi: any) => {
        if (responseApi.id) {
          // remplacement du contact mis à jour dans contacts$
          let contacts = this.contacts$.getValue();
          let index = contacts.findIndex((c: any) => c.id === responseApi.id);
          contacts[index] = responseApi;
          this.contacts$.next(contacts);
          // Message et navigation vers la page /contacts
          this.alertService.show('contact mis à jour');
          this.router.navigate(['/contacts']);
        }
      }
    )
  }

  /**
   * Delete contact in api
   * 
   * endpoint backend : [DELETE] /contacts/:id
   * @param contactId 
   * @returns  
   */
  deleteContactInApi(contactId: number) {
    return this.http.delete('http://localhost:1337/contacts/' + contactId).subscribe(
      (responseApi: any) => {
        console.log(responseApi);
        if (responseApi.id === contactId) {
          // suppression du contact dans contacts$
          this.contacts$.next(
            this.contacts$.getValue().filter((contact: any) => contact.id != contactId)
          )
          // message
          this.alertService.show('contact supprimé');
        }
      }
    )
  }


} // Fin Class
