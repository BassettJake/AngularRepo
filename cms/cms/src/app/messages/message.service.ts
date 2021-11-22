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
        this.http.get('http://localhost:3000/messages')
            .subscribe(
                // success method
                (messages: Message[]) => {
                    this.messages = messages;
                    this.messages  = JSON.parse(JSON.stringify(this.messages)).messages;
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
        if (!message) {
          return;
        }
    
        // make sure id of the new Message is empty
        message.id = '';
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        // add to database
        this.http.post<{ messageStr: string, message: Message }>('http://localhost:3000/messages',
          message,
          { headers: headers })
          .subscribe(
            (responseData) => {
              // add new message to messages
              this.messages.push(responseData.message);
             this.storeMessages();
            }
          );
      }

      updateMessage(originalMessage: Message, newMessage: Message) {
        if (!originalMessage || !newMessage) {
          return;
        }
    
        const pos = this.messages.findIndex(d => d.id === originalMessage.id);
    
        if (pos < 0) {
          return;
        }
    
        // set the id of the new Message to the id of the old Message
        newMessage.id = originalMessage.id;
        //newMessage._id = originalMessage._id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/messages/' + originalMessage.id,
          newMessage, { headers: headers })
          .subscribe(
            (response: Response) => {
              this.messages[pos] = newMessage;
            this.storeMessages();;
            }
          );
      }


      deleteMessage(message: Message) {

        if (!message) {
          return;
        }
    
        const pos = this.messages.findIndex(d => d.id === message.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/messages/' + message.id)
          .subscribe(
            (response: Response) => {
              this.messages.splice(pos, 1);
            this.storeMessages();;
            }
          );
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
