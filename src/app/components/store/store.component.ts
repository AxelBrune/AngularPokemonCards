import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  booster: Object[];
  constructor(private pokemonService: PokemonService, private userService: UserService) { }

  ngOnInit(): void {
  }

  openBooster()
  {
    if (this.userService.getUserDatas().coins > 0)
    {
      this.booster = this.pokemonService.getRandomCards();
      this.userService.buyBooster();
    }
  }

  sellStoreCard(card)
  {
    this.userService.sellCard();
    if (this.booster.indexOf(card) > -1)
    {
      this.booster.splice(this.booster.indexOf(card), 1);
    }   
  }

  takeCard(card)
  {
    this.userService.addToDeck(card);
    if (this.booster.indexOf(card) > -1)
    {
      this.booster.splice(this.booster.indexOf(card), 1);
    }   
  }

}
