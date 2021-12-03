import { Component, OnInit } from '@angular/core';
import { Word } from './word.model';
import { WordService } from './word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  selectedWord: Word;

  constructor(private wordService: WordService) { }

  ngOnInit(): void {

    this.wordService.wordSelectedEvent.subscribe((word: Word) => {
      this.selectedWord = word;
    })
  }
}
