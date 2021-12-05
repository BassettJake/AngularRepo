import { Injectable, EventEmitter } from '@angular/core';
import { Word } from './word.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOCKWORDS } from './MOCKWORDS';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  wordListChangedEvent = new Subject<Word[]>();
  words: Word[] = [];
  wordSelectedEvent = new EventEmitter<Word>();
  wordChangedEvent = new EventEmitter<Word[]>();
  maxWordId: number;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.maxWordId = this.getMaxId();
    //this.words = MOCKWORDS;
  }

  getWords(): Word[] {
    this.http.get('http://localhost:3000/words')
      .subscribe(
        // success method
        (words: Word[]) => {
          this.words = words;
          this.words = JSON.parse(JSON.stringify(this.words)).words;
          this.maxWordId = this.getMaxId();
          let sortingDocs = this.words.slice;
          this.words.sort(function (a, b) { return sortingDocs[a.id] - sortingDocs[b.id]; });
          this.wordChangedEvent.next(this.words.slice())
        },
        (error: any) => {
          console.log(error.message);
        }
      );

    return this.words.slice();
  }


  getWord(id: number): Word {

    return this.words.slice()[id];
  }

  addWord(word: Word) {
    if (!word) {
      return;
    }

    // make sure id of the new Word is empty
    word.id = Number('');

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http.post<{ message: string, word: Word }>('http://localhost:3000/words',
      word,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new word to words
          this.words.push(responseData.word);
          this.storeWords();
        }
      );
  }

  updateWord(originalWord: Word, newWord: Word) {
    if (!originalWord || !newWord) {
      return;
    }
    const pos = this.words.findIndex(d => d.id === originalWord.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Word to the id of the old Word
    newWord.id = originalWord.id;
    //newWord._id = originalWord._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put('http://localhost:3000/words/' + originalWord.id,
      newWord, { headers: headers })
      .subscribe(
        (response: Response) => {
          console.log(this.words[pos], newWord);
          this.words[pos] = newWord;
          this.storeWords();
        }
      );
  }


  deleteWord(word: Word) {

    if (!word) {
      return;
    }

    const pos = this.words.findIndex(d => d.id === word.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/words/' + word.id)
      .subscribe(
        (response: Response) => {
          this.words.splice(pos, 1);
          this.storeWords();
        }
      );
  }

  getMaxId(): number {

    let maxId = 0

    for (let word in this.words) {
      let currentId = Number(this.words[word].id);
      if (currentId > maxId) {
        maxId = currentId;
        break;
      }
    }
    return maxId
  }

  storeWords() {
    let words = JSON.stringify(this.words);
    this.http.put('https://angular-final-app-2021-default-rtdb.firebaseio.com/words.json', words,
      {
        headers: new HttpHeaders(
          {
            "content-type": "application/json"
          }
        )
      }
    )
      .subscribe(
        (success: any) => {
          this.wordChangedEvent.emit(success);
        }
      );
  }
}
