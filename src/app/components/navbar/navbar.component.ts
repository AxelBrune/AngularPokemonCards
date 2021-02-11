import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userInfos: {name, coins, deck}
  constructor(private userService: UserService) {
    this.userService.subscribe(this);
  }

  ngOnInit(): void {
    this.refresh();  
  }

  public refresh(){
    this.userInfos = this.userService.getUserDatas();
  }

  deleteAccount()
  {
    this.userService.deleteUser();
  }
}
