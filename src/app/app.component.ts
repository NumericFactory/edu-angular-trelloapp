import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoaderService } from './shared/services/loader.service';
import { UserService } from './shared/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'trello-app';
  loader: boolean = false;

  constructor(public loaderService: LoaderService, public userService: UserService) {
  }

  ngOnInit() {
    // this.loaderService.isLoadingObs
    // .subscribe(loader => this.loader = loader)

    // Pour faire la même chose : 
    // Angular propose le pipe async à utiliser dans la vue HTML

    // Avantages du pipe async:
    //  > permet de souscrire à un observable directment dans la vue HTML
    //  > Angular va unsubscribe automatiquement lors de la destruction du component
    //      (https://angular.io/api/common/AsyncPipe)
  }

  logoutAction() {
    this.userService.logout()
  }


} // Fin class AppComponent
