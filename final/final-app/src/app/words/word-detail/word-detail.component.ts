import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Word } from '../word.model';
import { WordService } from '../word.service';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {

  @Input() word: Word;
  id: number;

  constructor(private wordService: WordService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.word = this.wordService.getWord(this.id);
        }
      );
  }


  onDelete() {
    this.wordService.deleteWord(this.word);
    this.router.navigate(['/words']);
  }

}
