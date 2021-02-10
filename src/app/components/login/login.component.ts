import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name:string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.name = "";
    sessionStorage.clear();
  }

  userLogin() {
      this.userService.userLogin(this.name);
  }

}
