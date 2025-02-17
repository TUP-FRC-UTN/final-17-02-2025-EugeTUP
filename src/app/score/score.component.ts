import { Component } from '@angular/core';
import { Score } from '../interfaces/user';
import { GameServiceService } from '../services/game-service.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score',
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {

  constructor(public service: GameServiceService) { }

  rol: string = localStorage.getItem('rol') ?? '';
  subscription = new Subscription();

  scores: Score[] = []


  ngOnInit(): void {
    this.loadScores();
  }

  ngOnDestory(): void {
    this.subscription.unsubscribe();
  }

  loadScores() {

    const scoresSubcription = this.service.getScores().subscribe((scores) => {

      if(this.rol == 'admin'){
        this.scores = scores;
      }else{
        this.scores = scores.filter((score) => score.playerName == localStorage.getItem('name'));
      }
    
    })
    this.subscription.add(scoresSubcription);
  }



}
