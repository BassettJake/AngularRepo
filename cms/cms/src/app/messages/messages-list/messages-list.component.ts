import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  messages: Message[] = [

    new Message(1, 'Message1',"this is message #1","person1"),
    new Message(2, 'Message2',"this is message #2","person2"),
    new Message(3, 'Message3',"this is message #3","person3")

  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
