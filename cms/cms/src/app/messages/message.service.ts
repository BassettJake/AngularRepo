import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MessageService {

    messages: Message[] = [];
    messageChangedEvent = new EventEmitter<Message[]>();
    http: HttpClient;
    maxMessageId: number;

    constructor(http: HttpClient) {
        this.http = http;
    }

    getMessages(): Message[] {
        this.http.get('https://angular-nov21-default-rtdb.firebaseio.com/messages.json')
            .subscribe(
                // success method
                (messages: Message[]) => {
                    this.messages = messages;
                    this.maxMessageId = this.getMaxId();
                    let sortingMsgs = this.messages.slice;
                    this.messages.sort(function (a, b) { return sortingMsgs[a.id] - sortingMsgs[b.id]; });
                    this.messageChangedEvent.next(this.messages.slice())
                },
                (error: any) => {
                    console.log(error.message);
                }
            );
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

    addMessage(message: Message) {
        this.messages.push(message);
        this.storeMessages();
        this.messageChangedEvent.emit(this.messages.slice());

    }

    getMaxId(): number {

        let maxId = 0

        for (let message in this.messages) {
            let currentId = Number(this.messages[message].id);
            if (currentId > maxId) {
                maxId = currentId;
                break;
            }
        }
        return maxId
    }

    storeMessages() {
        let messages = JSON.stringify(this.messages);
        this.http.put('https://angular-nov21-default-rtdb.firebaseio.com/messages.json', messages,
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
                    this.messageChangedEvent.emit(success);
                }
            );
    }

}
