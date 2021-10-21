import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
    contactListChangedEvent = new Subject<Contact[]>();
    contacts: Contact[] = [];
    contactSelectedEvent = new EventEmitter<Contact>();
    contactChangedEvent = new EventEmitter<Contact[]>();
    maxContactId: number;

    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContacts(): Contact[] {
         return this.contacts.slice();
    }

    
    getContact(id: string): Contact {
        return this.contacts.slice()[id];
    }

    addContact(newContact: Contact) {
        if (newContact == undefined ||newContact == null){
            return
        }
        this.maxContactId++
        newContact.id = String(this.maxContactId);

        this.contacts.push(newContact);
        let contactsListClone = this.contacts.slice()
        this.contactChangedEvent.next(contactsListClone)
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if(originalContact == undefined || originalContact == null ||
            newContact == undefined || originalContact == null){
                return;
            }
        let pos = this.contacts.indexOf(originalContact)
        if (pos < 0){
            return
        }
    
        newContact.id = originalContact.id
        this.contacts[pos] = newContact
        let contactsListClone = this.contacts.slice()
        this.contactChangedEvent.next(contactsListClone)
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
    this.contactChangedEvent.emit(this.contacts.slice());
 }
 

}
