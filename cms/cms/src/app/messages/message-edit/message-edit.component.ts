import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') messageInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = "Jake"

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgInputText = this.messageInputRef.nativeElement.value;
    const newMessage = new Message(0, msgSubject, msgInputText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = "";
    this.messageInputRef.nativeElement.value = "";
  }

}
