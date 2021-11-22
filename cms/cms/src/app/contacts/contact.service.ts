import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContactService {
    contactListChangedEvent = new Subject<Contact[]>();
    contacts: Contact[] = [];
    contactSelectedEvent = new EventEmitter<Contact>();
    contactChangedEvent = new EventEmitter<Contact[]>();
    maxContactId: number;
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
        this.maxContactId = this.getMaxId();
    }

    getContacts(): any {
        return new Promise((resolve, reject) => {

            this.http.get('http://localhost:3000/contacts')
                .subscribe(
                    // success method
                    (contacts: Contact[]) => {
                        this.contacts = contacts;
                        this.contacts  = JSON.parse(JSON.stringify(this.contacts)).contacts;
                        this.maxContactId = this.getMaxId();
                        let sortingCons = this.contacts.slice;
                        this.contacts.sort(function (a, b) { return sortingCons[a.id] - sortingCons[b.id]; });
                        this.contactChangedEvent.next(this.contacts.slice())
                        resolve(this.contacts.slice());
                    },
                    (error: any) => {
                        console.log(error.message);
                    }
                );

        });

    }


    getContact(id: string): Contact {
        return this.contacts.slice()[id];
    }

    addContact(contact: Contact) {
        if (!contact) {
          return;
        }
    
        // make sure id of the new Contact is empty
        contact.id = '';
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // add to database
        this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
          contact,
          { headers: headers })
          .subscribe(
            (responseData) => {
              // add new contact to contacts
              this.contacts.push(responseData.contact);
             this.storeContacts();
            }
          );
      }

      updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
          return;
        }
    
        const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    
        if (pos < 0) {
          return;
        }
    
        // set the id of the new Contact to the id of the old Contact
        newContact.id = originalContact.id;
        //newContact._id = originalContact._id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/contacts/' + originalContact.id,
          newContact, { headers: headers })
          .subscribe(
            (response: Response) => {
              this.contacts[pos] = newContact;
            this.storeContacts();
            }
          );
      }


      deleteContact(contact: Contact) {

        if (!contact) {
          return;
        }
    
        const pos = this.contacts.findIndex(d => d.id === contact.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/contacts/' + contact.id)
          .subscribe(
            (response: Response) => {
              this.contacts.splice(pos, 1);
            this.storeContacts();
            }
          );
      }

    getMaxId(): number {

        let maxId = 0

        for (let contact in this.contacts) {
            let currentId = Number(this.contacts[contact].id);
            if (currentId > maxId) {
                maxId = currentId;
                break;
            }
        }
        return maxId
    }

    storeContacts() {
        let contacts = JSON.stringify(this.contacts);
        this.http.put('https://angular-nov21-default-rtdb.firebaseio.com/contacts.json', contacts,
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
                    this.contactChangedEvent.emit(success);
                }
            );
    }

}
