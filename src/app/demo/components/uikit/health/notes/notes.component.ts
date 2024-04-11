import {Component, ViewChild, ElementRef, AfterViewInit, Renderer2, SecurityContext} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements AfterViewInit {
  @ViewChild('editor') editor: any;

  cardMenu: MenuItem[] = [];
  notes: { header: string, content: SafeHtml }[] = [];
  editingIndex: number ;

  headerInput: string = ''; // To store the edited header temporarily

  constructor(private renderer: Renderer2, private sanitizer: DomSanitizer) {}

  ngAfterViewInit() {

    this.cardMenu = [
/*      {
        label: 'Edit', icon: 'pi pi-fw pi-check', command: (event) => this.editNoteFromMenu(this.editingIndex)
      },*/
      {
        label: 'Delete', icon: 'pi pi-fw pi-trash', command: (event) => this.deleteNote(this.editingIndex)
      }
    ];
    this.adjustImageSizes();

    // Replace 'DOMNodeInserted' event listener with MutationObserver
    const observer = new MutationObserver(() => {
      this.adjustImageSizes();
    });

    // Configure the observer to watch for changes in the editor's root element
    observer.observe(this.editor.getQuill().root, { childList: true, subtree: true })

    this.editor.quill.root.addEventListener('dblclick', () => {
      console.log('Double-click event triggered');
      this.saveNoteContent();
    });


  }


  addNote() {
    const editorContent = this.editor.getQuill().root.innerHTML.trim();
    if (editorContent !== '') {
      const header = `Notes ${this.notes.length + 1}`;
      const newNote = { header, content: this.sanitizer.bypassSecurityTrustHtml(editorContent) };
      this.notes.push(newNote);
      // Clear the editor
      this.editor.getQuill().root.innerText = '';
      setTimeout(() => {
        this.adjustImageSizes();
      }, 100); // Adjust delay as needed
    }
  }
  // Method to handle editing a note from the menu
  editNoteFromMenu(index: number) {
    console.log('edit note triggered from menu for index: ', index);

    // Call the editNoteContent method with the specified index
    this.editNoteContent(index);
  }


  private adjustImageSizes() {
    const images = document.querySelectorAll('.note-content img');
    images.forEach(img => {
      this.renderer.setStyle(img, 'max-width', '100%');
      this.renderer.setStyle(img, 'height', 'auto');
    });
  }
  saveNoteContent() {
    if (this.editingIndex !== null) {
      const editorContent = this.editor.getQuill().root.innerHTML.trim();
      const sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(editorContent);
      this.notes[this.editingIndex].content = sanitizedContent;
      this.editingIndex = null;
      // Clear the editor
      this.editor.getQuill().root.innerText = '';
    }
  }


  editNoteContent(index: number) {
    console.log('edit note content triggered for index: ', index);

    // Check if this.notes[index] is defined
    if (this.notes[index]) {
      const editorContent: string = this.sanitizer.sanitize(
          SecurityContext.HTML,
          this.notes[index].content
      ) || '';

      this.editor.getQuill().root.innerHTML = editorContent;
      this.editingIndex = index;
    } else {
      console.error('Note at index', index, 'is undefined.');
      // Handle the case when the note is undefined, e.g., show an error message
    }
  }


  // Method to handle editing the note header
  editNoteHeader(index: number) {
    this.editingIndex = index;
    this.headerInput = this.notes[index].header;
  }

  saveNoteHeader() {
    if (this.editingIndex !== null) {
      this.notes[this.editingIndex].header = this.headerInput;
      this.editingIndex = null;
    }
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
  }


}
