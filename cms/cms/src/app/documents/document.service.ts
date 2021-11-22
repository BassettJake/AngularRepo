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

        this.http.get('http://localhost:3000/documents')
            .subscribe(
                // success method
                (documents: Document[]) => {
                    this.documents = documents;
                    this.documents  = JSON.parse(JSON.stringify(this.documents)).documents;
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

    addDocument(document: Document) {
        if (!document) {
          return;
        }
    
        // make sure id of the new Document is empty
        document.id = Number('');
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // add to database
        this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
          document,
          { headers: headers })
          .subscribe(
            (responseData) => {
              // add new document to documents
              this.documents.push(responseData.document);
             this.storeDocuments();
            }
          );
      }

      updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) {
          return;
        }
    
        const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    
        if (pos < 0) {
          return;
        }
    
        // set the id of the new Document to the id of the old Document
        newDocument.id = originalDocument.id;
        //newDocument._id = originalDocument._id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/documents/' + originalDocument.id,
          newDocument, { headers: headers })
          .subscribe(
            (response: Response) => {
              this.documents[pos] = newDocument;
             this.storeDocuments();
            }
          );
      }


      deleteDocument(document: Document) {

        if (!document) {
          return;
        }
    
        const pos = this.documents.findIndex(d => d.id === document.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/documents/' + document.id)
          .subscribe(
            (response: Response) => {
              this.documents.splice(pos, 1);
            this.storeDocuments();
            }
          );
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
