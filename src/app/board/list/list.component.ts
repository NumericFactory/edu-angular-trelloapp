import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { List } from '../../shared/models/board.model';
import { BoardService } from '../../shared/services/board.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() lists: List[];
  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    console.log(this);
  }

  drop(event) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  /**
   * Add list in Board
   */
  addList(): void {
    let nameList = window.prompt('Renseigner un nom de liste');
    if (nameList !== null && nameList.trim().length > 0) {
      this.boardService.createList(nameList)
    }
  }

  /**
   * Del list
   * @param id 
   */
  delList(id: number): void {
    if (window.confirm('Supprimer cette liste?')) {
      console.log(id);
      this.boardService.deleteList(id);
    }
  }

  /**
   * Adds card
   * @param listId 
   */
  addCard(listId: number): void {
    let nameCard: string = window.prompt('Nom de la cate?');
    if (nameCard !== null && nameCard.trim().length > 0) {
      this.boardService.createCard(listId, nameCard)
    }
  }

  // /**********************************/
  // getConnectedListsArray(): string[] {
  //   let arr = [];
  //   let otherLists = this.boardService.getBoard().filter(list => list.id !== this.list.id);
  //   for (let list of otherLists) {
  //     arr.push(list.name);
  //   }
  //   //arr.map(id => id.toString());
  //   console.log(arr);
  //   return arr;
  // }


}
