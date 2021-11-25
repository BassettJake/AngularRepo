import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WordsComponent } from '../words/words.component';
import { WordDetailComponent } from '../words/word-detail/word-detail.component';
import { WordEditComponent } from '../words/word-edit/word-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/words', pathMatch: 'full' },
  {
    path: 'words', component: WordsComponent, children: [
      { path: 'new', component: WordEditComponent },
      { path: ':id', component: WordDetailComponent },
      { path: ':id/edit', component: WordEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
