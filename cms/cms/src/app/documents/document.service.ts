import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentService {

    documents: Document[];
    documentSelectedEvent = new EventEmitter<Document>();

    constructor() {
        this.documents = MOCKDOCUMENTS;
    }

    getDocuments(): Document[] {
        return this.documents.slice();
    }


    getDocument(id: number): Document {
        let documents = this.getDocuments();
        for (let document in documents) {
            if (documents[document].id == id) {
                return documents[document];
            }
        }
        return null;
    }

}
