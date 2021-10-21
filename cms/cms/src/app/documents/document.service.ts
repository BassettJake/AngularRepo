import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable()
export class DocumentService {
    documentListChangedEvent = new Subject<Document[]>();
    documents: Document[];
    documentSelectedEvent = new EventEmitter<Document>();
    documentChangedEvent = new EventEmitter<Document[]>();
    maxDocumentId: number;

    constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
    }

    getDocuments(): Document[] {
        return this.documents.slice();
    }


    getDocument(id: number): Document {
        return this.documents.slice()[id];
    }

    addDocument(newDocument: Document) {
        if (newDocument == undefined ||newDocument == null){
            return
        }
        this.maxDocumentId++
        newDocument.id = this.maxDocumentId;

        this.documents.push(newDocument);
        let documentsListClone = this.documents.slice()
        this.documentChangedEvent.next(documentsListClone)
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if(originalDocument == undefined || originalDocument == null ||
            newDocument == undefined || originalDocument == null){
                return;
            }
        let pos = this.documents.indexOf(originalDocument)
        if (pos < 0){
            return
        }
    
        newDocument.id = originalDocument.id
        this.documents[pos] = newDocument
        let documentsListClone = this.documents.slice()
        this.documentChangedEvent.next(documentsListClone)
    }


    deleteDocument(document: Document) {
        if (!document) {
            return;
        }
        const pos = this.documents.indexOf(document);
        if (pos < 0) {
            return;
        }
        this.documents.splice(pos, 1);
        let documentsListClone = this.documents.slice()
        this.documentChangedEvent.emit(documentsListClone);
    }

    getMaxId(): number {

        let maxId = 0
    
        for (let document in this.documents){
            let currentId = Number(this.documents[document].id);
            if (currentId > maxId){
                maxId = currentId;
                 break;
            } 
        }
        return maxId
    }
}
