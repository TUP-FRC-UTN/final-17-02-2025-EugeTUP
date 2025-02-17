import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Word } from '../interfaces/user';
import { Subscription } from 'rxjs';
import { GameServiceService } from '../services/game-service.service';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  constructor(public service: GameServiceService) { }

  alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  words: Word[] = [];

  wordToGuess: string = '';
  hiddenWord: string[] = [];
  correctLetters: string[] = [];
  incorrectLetters: string[] = [];
  attemptsLeft: number = 6;
  errorCount: number = 0;
  gameStatus: 'playing' | 'won' | 'lost' = 'playing';
  subscription = new Subscription();
  totalScore: number = 0;
  myMatches: any[] = [];



  ngOnInit(): void {
    this.loadWords();
    this.loadMatches();
  }


  loadWords() {

    const wordsSubcription = this.service.getWords().subscribe((words) => {
      this.words = words;
    })
    this.subscription.add(wordsSubcription);
  }

  loadMatches(){

    const matchesSubcription = this.service.getScores().subscribe((scores) => {
      this.myMatches = scores.filter(score => score.playerName === localStorage.getItem('name'));
    })
    this.subscription.add(matchesSubcription);
  }


  newGame(): void {
    this.wordToGuess = this.getRandomWord();

    this.hiddenWord = Array(this.wordToGuess.length).fill('_');

    this.correctLetters = [];
    this.incorrectLetters = [];
    this.attemptsLeft = 6;
    this.errorCount = 0;
    this.gameStatus = 'playing';

    console.log(this.wordToGuess)
  }

  getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    const word = this.words[randomIndex];
    return word.word;
  }

  checkLetter(letter: string): void {
    if (this.gameStatus !== 'playing' || this.isLetterUsed(letter)) {
      return;
    }

    if (this.wordToGuess.includes(letter)) {
      this.correctLetters.push(letter);

      for (let i = 0; i < this.wordToGuess.length; i++) {
        if (this.wordToGuess[i] === letter) {
          this.hiddenWord[i] = letter;
        }
      }

      if (!this.hiddenWord.includes('_')) {
        this.gameStatus = 'won';
        this.saveScore();
      }
    } else {
      this.incorrectLetters.push(letter);
      this.attemptsLeft--;
      this.errorCount++;

      if (this.attemptsLeft <= 0) {
        this.gameStatus = 'lost';
      }
    }
  }

  isLetterUsed(letter: string): boolean {
    return this.correctLetters.includes(letter) || this.incorrectLetters.includes(letter);
  }

  getButtonClass(letter: string): string {
    if (this.correctLetters.includes(letter)) {
      return 'btn-success';
    } else if (this.incorrectLetters.includes(letter)) {
      return 'btn-danger';
    } else {
      return 'btn-outline-primary';
    }
  }


  saveScore() {

    const createIdGame = this.createIdGame();
    this.calculateScore();

    const score = {
      playerName: localStorage.getItem('name') ?? '',
      word: this.wordToGuess,
      attemptsLeft: this.attemptsLeft,
      score: this.totalScore,
      date: new Date().toLocaleString(),
      idGame: createIdGame,
      id: ''
    }
    const scoreSubscription = this.service.saveScore(score).subscribe(
      (response) => {
        console.log('Score saved successfully', response);
        this.loadMatches(); 
      },
      (error) => {
        console.error('Error saving score', error);
      }
    );
    this.subscription.add(scoreSubscription);
  }


  createIdGame(): string {

    const playerName = localStorage.getItem('name') ?? '';
    const matchesCount = this.myMatches.length;
    const idGame = `p${matchesCount}${playerName.slice(0, 2)}`;
    return idGame.toUpperCase();

   }


  calculateScore() {

    switch (this.attemptsLeft) {
      case 6:
        this.totalScore = 100;
        break;
      case 5:
        this.totalScore = 80;
        break;
      case 4:
        this.totalScore = 60;
        break;
      case 3:
        this.totalScore = 40;
        break;
      case 2:
        this.totalScore = 20;
        break;
      case 1:
        this.totalScore = 10;
        break;
      default:
        this.totalScore = 0;
        break;
    }
  }
}

