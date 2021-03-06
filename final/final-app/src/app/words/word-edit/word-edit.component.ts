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
        case "??": text = "'aw' (awe)"; break;
        case "??": text = "'aa' (apple)"; break;
        case "??": text = "'uh' (umbrella)"; break;
        case "??": text = "'ou' (horse)"; break;
        case "a??": text = "'ow' (owl)"; break;
        case "a??": text = "'ie' (ice)"; break;
        case "b": text = "'b' (bee)"; break;
        case "??": text = "'ch' (cheese)"; break;
        case "d": text = "'d' (dog)"; break;
        case "??": text = "'th' (the)"; break;
        case "??": text = "'eh' (elm)"; break;
        case "??": text = "'er' (burn)"; break;
        case "e??": text = "'ae' (ape)"; break;
        case "f": text = "'f' (fly)"; break;
        case "??": text = "'g' (grow)"; break;
        case "h": text = "'h' (hunt)"; break;
        case "??": text = "'ih' (itch)"; break;
        case "i": text = "'ee' (eagle)"; break;
        case "d??": text = "'j' (giant)"; break;
        case "k": text = "'k' (kelp)"; break;
        case "l": text = "'l' (low)"; break;
        case "m": text = "'m' (mellon)"; break;
        case "n": text = "'n' (night)"; break;
        case "??": text = "'ng' (angler)"; break;
        case "o??": text = "'oh' (own)"; break;
        case "????": text = "'oi' (boing)"; break;
        case "p": text = "'p' (place)"; break;
        case "??": text = "'r' (right)"; break;
        case "s": text = "'s' (slice)"; break;
        case "??": text = "'sh' (leash)"; break;
        case "t": text = "'t' (team)"; break;
        case "??": text = "'th' (thought)"; break;
        case "??": text = "'uu' (book)"; break;
        case "u": text = "'oo' (who)"; break;
        case "v": text = "'v' (valley)"; break;
        case "w": text = "'w' (wall)"; break;
        case "j": text = "'y' (yam)"; break;
        case "z": text = "'z' (zebra)"; break;
        case "??": text = "'zh' (illusion)"; break;
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
    let value = form.value // get values from form???s fields
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
