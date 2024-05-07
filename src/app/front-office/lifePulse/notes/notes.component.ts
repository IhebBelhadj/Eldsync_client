import {AfterViewInit, Component, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";
import {SharedLifePulseService} from "../../services/sharedLifePulse.service";
import {NoteService} from "../../services/note.service";
import {Note} from "../../api/notes";
import {AccordionModule} from "primeng/accordion";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
@Component({
  selector: 'app-notes',
  standalone: true,
    imports: [
        NgIf,
        RouterLinkActive,
        InputTextModule,
        ButtonModule,
        RippleModule,
        EditorModule,
        FormsModule,
        RouterLink,
        NgForOf,
        AccordionModule,
        MenuModule,
        NgClass

    ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit, AfterViewInit{
    editorVisible: boolean = false;
    text: string;
    notes: Note[];
    modifyCssImage: boolean = false;
    currentNote: Note = { title: '', content: '',imageData: null};
    @ViewChild('editor') editor: any;

    @Output() toggleVisibility = new EventEmitter<void>();





    constructor(private renderer: Renderer2, private sanitizer: DomSanitizer,private sharedLifePulseService: SharedLifePulseService,private noteService: NoteService) {}
    ngAfterViewInit() {
        this.adjustImageSizes();

        // Replace 'DOMNodeInserted' event listener with MutationObserver
        const observer = new MutationObserver(() => {
            this.adjustImageSizes();
        });
        observer.observe(this.editor.getQuill().root, { childList: true, subtree: true })




    }
    ngOnInit() {

      this.fetchNotes();
        this.sharedLifePulseService.modifyCssImage$.subscribe(modify => {
            this.modifyCssImage = modify;
        });
  }

    fetchNotes() {
        this.noteService.getAllNotes().subscribe(notes => {
            this.notes = notes;
        });
    }

    createNote() {
        if (!this.editor || !this.editor.getQuill) {
            console.error("Editor is not properly initialized.");
            return;
        }

        // Extract HTML content from the editor
        const editorContent = this.editor.getQuill().root.innerHTML.trim();

        // Check if the editor content is not empty
        if (editorContent !== '') {
            const regex = /<img.*?src="data:image\/[^;]+;base64,([^"]+)".*?>/g;
            let match;
            let imageData = '';

            // Iterate through matches in the editor content
            while ((match = regex.exec(editorContent)) !== null) {
                imageData = match[1]; // Extract the Base64-encoded image data from the first match
                break; // Exit loop after finding the first image
            }

            // Convert the Base64-encoded image data to a byte array
            const byteCharacters = atob(imageData);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            // Create a new note object
            const newNote: Note = {
                title: this.currentNote.title,
                content: this.stripHtmlTags(editorContent), // Strip HTML tags if needed
                imageData: byteArray // Set the image data as a byte array
            };

            // Subscribe to the note service to create the note
            this.noteService.createNote(newNote.title,newNote.content,newNote.imageData).subscribe(() => {
                // After creating the note, fetch the updated list of notes
                this.fetchNotes();

                // Toggle the editor visibility
                this.toggleEditor();

                // Reset the currentNote object
                this.currentNote = { title: '', content: '', imageData: null };
            });

            // Clear the editor
            this.editor.getQuill().root.innerHTML = '';

            // Optionally, adjust image sizes
            setTimeout(() => {
                this.adjustImageSizes();
            }, 100);
        }
    }




    stripHtmlTags(html: string): string {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

    updateNote() {
 /*       if (this.currentNote.title && this.currentNote.content) {*/
            this.editorVisible = !this.editorVisible;
            this.sharedLifePulseService.toggleContainerVisibility();
            this.sharedLifePulseService.toggleModifyCss();
            this.noteService.updateNote(this.currentNote).subscribe(() => {
                this.fetchNotes();
                this.toggleEditor();
                this.currentNote = {title: '', content: '' };
            });/*
        }*/
    }

    deleteNote(id: number) {
        this.noteService.deleteNoteById(id).subscribe(() => {
            this.fetchNotes();
        });
    }



    editNote(note: Note) {
        this.currentNote = { ...note }; // Copy note object to avoid modifying the original
        this.toggleEditor();
    }
  toggleEditor() {
    this.editorVisible = !this.editorVisible;
    this.sharedLifePulseService.toggleContainerVisibility();
    this.sharedLifePulseService.toggleModifyCss();
    this.sharedLifePulseService.toggelModifyCssImage();
      // Check if the editor component and its Quill instance are properly initialized
      if (this.editor && this.editor.quill) {
          // Access the Quill editor instance
          console.log('Quill instance:', this.editor.quill);
      } else {
          console.error("Editor is not properly initialized.");
      }
  }
  exit(){
        this.editorVisible = !this.editorVisible;
        this.sharedLifePulseService.toggleContainerVisibility();
      this.sharedLifePulseService.toggleModifyCss();
    }
    private adjustImageSizes() {
        const images = document.querySelectorAll('.note-content img');
        images.forEach(img => {
            this.renderer.setStyle(img, 'max-width', '20%');
            this.renderer.setStyle(img, 'height', 'auto');
        });
    }
}
