import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  coins:number;
  name;
  deck = [];
  subs = [];
  constructor(private http: HttpClient) {
    this.coins = 100;
    this.name = 'OfBqPukTCp1A0Ss';
   }


  userLogin(name)
  {
    let user = '{"name": "'+name+'"}';
    let url = 'https://lostin70s.com/lpwebfront/api/poke-user/login';
    this.http.post(url, JSON.parse(user))
    .subscribe(
      data => {
          sessionStorage.setItem('userToken', data.token);
          this.setUserInfos();
      },
      (error: HttpErrorResponse) => {
        console.log("Problème lors du log : ", error.error.message);
      }
    )
  }

  setUserInfos()
  {
    let url = "https://lostin70s.com/lpwebfront/api/poke-user/user";
    const tok = sessionStorage.getItem('userToken');
    
    const headers = new HttpHeaders().set('token', tok);
    this.http.get(url, {headers: headers}).subscribe(
      data => {
        this.name = data.name;
        this.coins = data.coins;
        this.deck = data.deck;
        sessionStorage.setItem('userInfos', JSON.stringify(data));
      }
    );   
  }

  public getUserDatas() {
    const infos = sessionStorage.getItem('userInfos');
    if(this.name == 'OfBqPukTCp1A0Ss')
    {
      const json = JSON.parse(infos);
      this.name = json.name;
      this.coins = json.coins;
      this.deck = json.deck;
    }
    return {
      coins: this.coins,
      name: this.name,
      deck: this.deck,
    };
  }

  saveUser()
  {
    console.log(this.getUserDatas());
    let infos = {
      "name": this.name,
      "coins": this.coins,
      "deck": this.deck
    }
    let url = "https://lostin70s.com/lpwebfront/api/poke-user/";
    const tok = sessionStorage.getItem('userToken');
    
    const headers = new HttpHeaders().set('token', tok);
    this.http.put(url, infos, {headers})
    .subscribe(data => console.log(data));
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

  deleteUser()
  {
    let url = "https://lostin70s.com/lpwebfront/api/poke-user/";
    const tok = sessionStorage.getItem('userToken');
    
    const headers = new HttpHeaders().set('token', tok);
    this.http.delete(url, {headers})
    .subscribe(data => {
      console.log(data);
    })
  }
  
  private notify() {
    this.subs.forEach((element) => {
      element.refresh();
    });
    this.saveUser();
  }
}
