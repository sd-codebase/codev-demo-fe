export interface IStatus {
    currentTask: string,
    authorTask: string,
    quoteTask: string,
    isInProgress: boolean,
}

export interface IAuthor {
    authorId: number;
    name: string;
}

export interface IQuote {
    quoteId: number;
    authorId: number;
    quote: string;
}
