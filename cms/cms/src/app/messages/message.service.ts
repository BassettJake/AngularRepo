import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable()
export class MessageService {

    messages: Message[];
    messageChangedEvent  = new EventEmitter<Message[]>();

    constructor() {
        this.messages = MOCKMESSAGES;
    }

    getMessages(): Message[] {
        return this.messages.slice();
    }


    getMessage(id: string): Message {
        let messages = this.getMessages();
        for (let message in messages) {
            if (messages[message].id == id) {
                return messages[message];
            }
        }
        return null;
    }

    addMessage(message: Message){
        this.messages.push(message);
        this.messageChangedEvent.emit(this.messages.slice());

    }

}
