import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Word } from '../../word.model';

@Component({
  selector: 'app-word-item',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.css']
})
export class WordItemComponent implements OnInit {

  @Input() word: Word;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
