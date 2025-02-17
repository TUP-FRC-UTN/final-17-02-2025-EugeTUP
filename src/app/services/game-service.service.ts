import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score, Word } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor(public http: HttpClient) { }


  private readonly SCORES_URL = 'https://671fe287e7a5792f052fdf93.mockapi.io/scores';
  private readonly WORD_URL = 'https://671fe287e7a5792f052fdf93.mockapi.io/words';
  // private readonly GAME_URL = 'https://671fe287e7a5792f052fdf93.mockapi.io/words';


  getScores(): Observable<Score[]>{
    return this.http.get<Score[]>(this.SCORES_URL);
  }


  getWords(): Observable<Word[]>{
    return this.http.get<Word[]>(this.WORD_URL);
  }


  saveScore(score: Score): Observable<Score>{
    return this.http.post<Score>(this.SCORES_URL, score);
  }




}
