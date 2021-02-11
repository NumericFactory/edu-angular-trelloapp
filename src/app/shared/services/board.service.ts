import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Board, Card, List, Priority } from '../models/board.model';
import { data } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  /* */
  private data: Board = data;

  constructor() { }

  /**
   * Gets board
   * @returns board 
   */
  getBoard(): Board {
    return this.data;
  }

  /**
   * Creates list
   * @returns void
   */
  createList(name: string): void {
    let newList: List = { id: Date.now(), name: name, cards: [] };
    this.data.push(newList);
  }

  /**
   * Deletes list
   */
  deleteList(idList: number): void {
    let index = this.data.findIndex(list => list.id === idList);
    this.data.splice(index, 1);
  }

  moveCard(listId: number, previousIndex: number, currentIndex: number): void {
    console.log('listId: ', listId);
    console.log('Previous Index of card: ', previousIndex);
    console.log('Current Index of card: ', currentIndex);
    let list: List = this.data.find(item => item.id === listId);
    moveItemInArray(list.cards, previousIndex, currentIndex);
  }

  moveCardInOtherList(event): void {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }

  createCard(listId, nameCard) {
    let list: List = this.data.find(item => item.id === listId);
    let newCard: Card = { id: Date.now(), title: nameCard, content: '', priority: Priority.green }
    list.cards.push(newCard)
  }


}
