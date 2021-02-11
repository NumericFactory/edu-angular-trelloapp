export interface Board extends Array<List> { }

export interface List {
   id: number;
   name: string;
   cards: Array<Card>
}

export interface Card {
   id: number;
   title: string;
   content: string;
   priority: Priority;
}

export enum Priority {
   green = 1,
   orange = 2,
   red = 3
}

