export class Word {
    public id: number;
    public plainText: string;
    public ipaText: string;
    constructor(id: number, plainText: string,ipaText: string) {
        this.id = id;
        this.plainText = plainText;
        this.ipaText = ipaText;
    }
}
