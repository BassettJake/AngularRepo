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

            this.http.get('https://angular-nov21-default-rtdb.firebaseio.com/contacts.json')
                .subscribe(
                    // success method
                    (contacts: Contact[]) => {
                        this.contacts = contacts;
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

    addContact(newContact: Contact) {
        if (newContact == undefined || newContact == null) {
            return
        }
        this.maxContactId++
        newContact.id = String(this.maxContactId);

        this.contacts.push(newContact);
        this.storeContacts();
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (originalContact == undefined || originalContact == null ||
            newContact == undefined || originalContact == null) {
            return;
        }
        let pos = this.contacts.indexOf(originalContact)
        if (pos < 0) {
            return
        }

        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        this.storeContacts();
    }



    deleteContact(contact: Contact) {
        if (!contact) {
            return;
        }
        const pos = this.contacts.indexOf(contact);
        if (pos < 0) {
            return;
        }
        this.contacts.splice(pos, 1);
        this.storeContacts();
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
