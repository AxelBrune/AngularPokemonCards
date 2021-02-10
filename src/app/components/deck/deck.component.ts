import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  userInfos: {}
  search: number;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userInfos = this.userService.getUserDatas();
    this.search = 0;
  }

  changeSearch(value)
  {
    console.log(value);
  }

}
