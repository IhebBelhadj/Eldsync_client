import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Note} from "../api/notes";

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    private apiUrl = 'http://localhost:8081/api/notes';



    constructor(private http: HttpClient) { }

    getAllNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(this.apiUrl);
    }
    createNote(title: string, content: string, imageData?: Uint8Array): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (imageData) {
            const blob = new Blob([imageData], { type: 'image/png' }); // Adjust the type if needed
            formData.append('image', blob, 'image.png');
        }

        return this.http.post(`${this.apiUrl}/addNote`, formData)
            .pipe(
                catchError(this.handleError)
            );
    }


    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
    }

/*    createNote(note: Note): Observable<Note> {
        return this.http.post<Note>('http://localhost:8081/api/notes/addNote', note);
    }*/

    updateNote(note: Note): Observable<Note> {
        return this.http.put<Note>(`${this.apiUrl}/${note.id}`, note);
    }

    deleteNoteById(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
