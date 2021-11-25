import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Word } from '../word.model';
import { WordService } from '../word.service';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {

  words: Word[];
  private subscription: Subscription;

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.words = this.wordService.getWords();
    this.subscription = this.wordService.wordChangedEvent.subscribe((words: Word[]) => {
      this.words = words;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
