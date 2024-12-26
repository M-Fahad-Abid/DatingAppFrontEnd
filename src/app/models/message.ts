export interface Message {
    id: number;
    senderId: number;
    senderName: string;
    senderPhotoUrl: any;
    recipientId: number;
    recipientUsername: string;
    recipientPhotoUrl: string;
    content: string;
    dateRead?: Date;
    dateSent: Date;
}
