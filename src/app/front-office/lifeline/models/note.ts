import { Asset } from "./asset";

export interface Note {
    noteId: string;
    noteMarkdown: string;
    createdAt?: string;
    updatedAt?: string;
    reminderTime?: string;
    assets?: Asset[];
}
