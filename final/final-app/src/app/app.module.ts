import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WordsComponent } from './words/words.component';
import { WordListComponent } from './words/word-list/word-list.component';
import { WordEditComponent } from './words/word-edit/word-edit.component';
import { WordDetailComponent } from './words/word-detail/word-detail.component';
import { WordItemComponent } from './words/word-list/word-item/word-item.component';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    AppComponent,
    WordsComponent,
    WordListComponent,
    WordEditComponent,
    WordDetailComponent,
    WordItemComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
