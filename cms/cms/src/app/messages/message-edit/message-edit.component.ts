import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') messageInputRef: ElementRef;

  currentSender: string = "7"

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgInputText = this.messageInputRef.nativeElement.value;
    const newMessage = new Message("15", msgSubject, msgInputText, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = "";
    this.messageInputRef.nativeElement.value = "";
  }

}
