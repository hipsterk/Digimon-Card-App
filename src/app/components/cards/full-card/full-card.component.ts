import {Component, Input} from '@angular/core';
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Store} from "@ngrx/store";
import {ICard} from "../../../models";

import * as SaveActions from "../../../store/actions/save.actions";

@Component({
  selector: 'digimon-full-card',
  templateUrl: './full-card.component.html',
  styleUrls: ['./full-card.component.scss']
})
export class FullCardComponent {
  @Input() card: ICard;
  @Input() count: number;
  @Input() collectionMode: boolean|null = true;

  faPlus = faPlus;
  faMinus = faMinus;

  constructor(private store: Store) {}

  increaseCard(id: string) {
    this.store.dispatch(SaveActions.increaseCardCount({id}))
  }

  decreaseCard(id: string) {
    this.store.dispatch(SaveActions.decreaseCardCount({id}))
  }

  countChange(id: string) {
    this.store.dispatch(SaveActions.changeCardCount({id, count:this.count}))
  }

  getAA(): string {
    switch (this.card.color) {
      case 'Red':
        return 'assets/images/banner/ico_card_detail_red.png';
      case 'Blue':
        return 'assets/images/banner/ico_card_detail_blue.png';
      case 'Yellow':
        return 'assets/images/banner/ico_card_detail_yellow.png';
      case 'Green':
        return 'assets/images/banner/ico_card_detail_green.png';
      case 'Black':
        return 'assets/images/banner/ico_card_detail_black.png';
      case 'Purple':
        return 'assets/images/banner/ico_card_detail_purple.png';
      case 'White':
        return 'assets/images/banner/ico_card_detail_white.png';
      default:
        return '';
    }
  }
}