import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';
@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
  providers: [ContactService]
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message
  messageSender: string;

  constructor(private contactService: ContactService) { }

  async ngOnInit() {
    let contacts = await this.contactService.getContacts();

    const contact: Contact = contacts.find(f => f.id == this.message.id);
 //   const contact: Contact = this.contactService.getContact(this.message.id);
    this.messageSender = contact.name;
 }

}
