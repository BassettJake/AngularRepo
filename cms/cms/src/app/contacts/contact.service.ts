import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
    contacts: Contact[] = [];
    contactSelectedEvent = new EventEmitter<Contact>();

    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContacts(): Contact[] {
         return this.contacts.slice();
    }

    
getContact(id: string): Contact {
    let contacts = this.getContacts();
    for(let contact in contacts){
        if(contacts[contact].id == id){
            return contacts[contact];
        }
    }
    return null;
   } 
 

}
