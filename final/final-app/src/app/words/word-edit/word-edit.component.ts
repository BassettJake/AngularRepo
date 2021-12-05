import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Word } from '../word.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WordService } from '../word.service';

@Component({
  selector: 'app-word-edit',
  templateUrl: './word-edit.component.html',
  styleUrls: ['./word-edit.component.css']
})
export class WordEditComponent implements OnInit {
  originalWord: Word;
  word: Word;
  editMode: boolean = false;
  id: number;
  
  @ViewChild('plainText',{read: ElementRef}) plainText: ElementRef;
  @ViewChild('ipaText',{read: ElementRef}) ipaText: ElementRef;
  @ViewChild('f') f: NgForm;


  constructor(private wordService: WordService,
    private router: Router,
    private route: ActivatedRoute) {

    }

  ngOnInit(): void {
    let list = document.getElementById("word-list");
    list.classList.add("hiddenEle");
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (this.id == null || this.id == undefined) {
          this.editMode = false
          return
        }
        this.originalWord = this.wordService.getWord(this.id);

        if (!this.originalWord) {
          return
        }

        this.editMode = true;
        this.word = JSON.parse(JSON.stringify(this.originalWord));
      });

      //set event listeners for the buttons on hover
      let eles = document.getElementsByClassName("ipaButton");
      let wec = this;
      for(let i = 0; i < eles.length; i++){
        eles[i].addEventListener("click", function () {
          wec.addIpaCharacter(eles[i].id);
        });
        eles[i].addEventListener("mouseover", function () {
          wec.setToggleTooltip(true, eles[i].id);
        });
        eles[i].addEventListener("mouseout", function () {
          wec.setToggleTooltip(false, eles[i].id);
        });
      }
  }

  ngOnDestroy(): void{
    let list = document.getElementById("word-list");
    list.classList.remove("hiddenEle");
  }

  setToggleTooltip(state, id){
    let ele = document.getElementById("tooltip");
    if(state == true){
      let text = "";
      switch (id){
        case "ɔ": text = "'aw' (awe)"; break;
        case "æ": text = "'aa' (apple)"; break;
        case "ʌ": text = "'uh' (umbrella)"; break;
        case "ɑ": text = "'ou' (horse)"; break;
        case "aʊ": text = "'ow' (owl)"; break;
        case "aɪ": text = "'ie' (ice)"; break;
        case "b": text = "'b' (bee)"; break;
        case "ʧ": text = "'ch' (cheese)"; break;
        case "d": text = "'d' (dog)"; break;
        case "ð": text = "'th' (the)"; break;
        case "ɛ": text = "'eh' (elm)"; break;
        case "ɚ": text = "'er' (burn)"; break;
        case "eɪ": text = "'ae' (ape)"; break;
        case "f": text = "'f' (fly)"; break;
        case "g": text = "'g' (grow)"; break;
        case "h": text = "'h' (hunt)"; break;
        case "I": text = "'ih' (itch)"; break;
        case "i": text = "'ee' (eagle)"; break;
        case "dʒ": text = "'j' (giant)"; break;
        case "k": text = "'k' (kelp)"; break;
        case "l": text = "'l' (low)"; break;
        case "m": text = "'m' (mellon)"; break;
        case "n": text = "'n' (night)"; break;
        case "ŋ": text = "'ng' (angler)"; break;
        case "oʊ": text = "'oh' (own)"; break;
        case "ɔɪ": text = "'oi' (boing)"; break;
        case "p": text = "'p' (place)"; break;
        case "ɹ": text = "'r' (right)"; break;
        case "s": text = "'s' (slice)"; break;
        case "ʃ": text = "'sh' (leash)"; break;
        case "t": text = "'t' (team)"; break;
        case "θ": text = "'th' (thought)"; break;
        case "ʊ": text = "'uu' (book)"; break;
        case "u": text = "'oo' (who)"; break;
        case "v": text = "'v' (valley)"; break;
        case "w": text = "'w' (wall)"; break;
        case "j": text = "'y' (yam)"; break;
        case "z": text = "'z' (zebra)"; break;
        case "ʒ": text = "'zh' (illusion)"; break;
      }
      ele.textContent = text;
      ele.classList.add("tooltip-show");
    }
    else{
      ele.textContent = "";
      ele.classList.remove("tooltip-show");
    }
  }

  addIpaCharacter(id){
    let text = this.ipaText.nativeElement.value;
    this.ipaText.nativeElement.value = text + "[" + id + "] ";
  }


  onSubmit(form: NgForm) {
    let value = form.value // get values from form’s fields
    let newWord = new Word(value.id, value.plainText, this.ipaText.nativeElement.value);
    if (this.editMode == true) {
      this.wordService.updateWord(this.originalWord, newWord);
    }
    else {
      this.wordService.addWord(newWord);
    }

    this.router.navigate(['/words']);
  }

  onCancel() {
    this.router.navigate(['/words']);
  }

  onClear(){
    this.f.reset();
  }

}
