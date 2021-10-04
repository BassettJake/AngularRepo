import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, "Doc1","The 1st document", '../../assets/images/jacksonk.jpg', []),
    new Document(1, "Doc2","The 2nd document", '../../assets/images/jacksonk.jpg', []),
    new Document(1, "Doc3","The 3rd document", '../../assets/images/jacksonk.jpg', []),
    new Document(1, "Doc4","The 4th document", '../../assets/images/jacksonk.jpg', []),
    new Document(1, "Doc5","The 5th document", '../../assets/images/jacksonk.jpg', [])
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
