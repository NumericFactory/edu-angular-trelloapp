import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // 1/ On créer le Subject privé isLoading$ 
  //    Seulement notre méthode 'setLoader' plus bas y a accès
  private isLoading$ = new BehaviorSubject<boolean>(false);

  // 2/ Puis on crée un Observable isLoadingObs à partir du subject isLoading$
  //    Ce procédé permet d'encapsuler isLoading$ dans le service
  //    En effet un subject est accessible en écriture (.next())
  //    Alors qu'un Observable n'est accessible qu'en lecture en y souscrivant (.subscribe())
  public isLoadingObs = this.isLoading$.asObservable().pipe(delay(0));

  // On ajoute un delay pour résoudre le bug
  // https://stackoverflow.com/questions/39787038/how-to-manage-angular2-expression-has-changed-after-it-was-checked-exception-w

  constructor() { }

  /**
   * Set loader to TRUE or FALSE
   * 
   * Cette méthode peut être utilisée dans l'interceptor Loader 
   * pour gérer l'affichage du loader automatiquement
   * et dans les components et les services si besoin
   * @param bool 
   */
  setLoader(bool: boolean) {
    this.isLoading$.next(bool);
  }


}
