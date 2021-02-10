import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  public getRandomCards()
  {
    let booster = [];
    for (let i=0; i < 10 ;i++)
    {
        let number = Math.floor(Math.random() * 200) + 1;
        let url = 'https://lostin70s.com/lpwebfront/api/pokemon/'+number;
        this.http.get(url)
        .subscribe(
            data=>{
                booster.push(data);
            }
        )
    }
    return booster;
  }
}
