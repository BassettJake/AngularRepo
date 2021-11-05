import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DocumentService {
    documentListChangedEvent = new Subject<Document[]>();
    documents: Document[] = [];
    documentSelectedEvent = new EventEmitter<Document>();
    documentChangedEvent = new EventEmitter<Document[]>();
    maxDocumentId: number;
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
        this.maxDocumentId = this.getMaxId();
    }

    getDocuments(): Document[] {

        this.http.get('https://angular-nov21-default-rtdb.firebaseio.com/documents.json')
            .subscribe(
                // success method
                (documents: Document[]) => {
                    this.documents = documents;
                    this.maxDocumentId = this.getMaxId();
                    let sortingDocs = this.documents.slice;
                    this.documents.sort(function (a, b) { return sortingDocs[a.id] - sortingDocs[b.id]; });
                    this.documentChangedEvent.next(this.documents.slice())
                },
                (error: any) => {
                    console.log(error.message);
                }
            );

        return this.documents.slice();
    }


    getDocument(id: number): Document {

        return this.documents.slice()[id];
    }

    addDocument(newDocument: Document) {
        if (newDocument == undefined || newDocument == null) {
            return
        }
        this.maxDocumentId++
        newDocument.id = this.maxDocumentId;

        this.documents.push(newDocument);
        this.storeDocuments();
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if (originalDocument == undefined || originalDocument == null ||
            newDocument == undefined || originalDocument == null) {
            return;
        }
        let pos = this.documents.indexOf(originalDocument)
        if (pos < 0) {
            return
        }

        newDocument.id = originalDocument.id;
        this.documents[pos] = newDocument;
        this.storeDocuments();
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
        this.storeDocuments();
    }

    getMaxId(): number {

        let maxId = 0

        for (let document in this.documents) {
            let currentId = Number(this.documents[document].id);
            if (currentId > maxId) {
                maxId = currentId;
                break;
            }
        }
        return maxId
    }

    storeDocuments() {
        let documents = JSON.stringify(this.documents);
        this.http.put('https://angular-nov21-default-rtdb.firebaseio.com/documents.json', documents,
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
                    this.documentChangedEvent.emit(success);
                }
            );
    }
}
