import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  coins = 100;
  name = 'Dresseur Axel';
  deck = [];
  subs = [];
  constructor(private http: HttpClient) { }


  userLogin(name)
  {
    let user = '{"name": "'+name+'"}';
    let url = 'https://lostin70s.com/lpwebfront/api/poke-user/login';
    this.http.post(url, JSON.parse(user))
    .subscribe(
      data => {
          sessionStorage.setItem('userToken', data.token);
      },
      (error: HttpErrorResponse) => {
        console.log("Problème lors du log : ", error.error.message);
      }
    )
  }

  async getUserInfos()
  {
    console.log("infos");
    let url = "https://lostin70s.com/lpwebfront/api/poke-user/user";
    const tok = sessionStorage.getItem('userToken');
    
    const headers = new HttpHeaders().set('token', tok);
    this.http.get(url, {headers: headers})
    .subscribe(
      data => {
        sessionStorage.setItem('infos', JSON.stringify(data));
      }
    )
  }

  public getUserDatas() {
    return {
      coins: this.coins,
      name: this.name,
      deck: this.deck,
    };
  }

  public subscribe(sub) {
    this.subs.push(sub);
  }

  public buyBooster() {
    this.coins -= 10;
    this.notify();
  }

  public sellCard() {
    this.coins += 0.5;
    this.notify();
  }

  public addToDeck(card)
  {
    this.deck.push(card);
    this.notify();
  }
  
  private notify() {
    this.subs.forEach((element) => {
      element.refresh();
    });
  }
}
