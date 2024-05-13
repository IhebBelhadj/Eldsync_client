import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {
  selectedFile: File;
  prediction: string;

  constructor(private http: HttpClient) {}

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post<any>('http://localhost:5000/predict', formData).subscribe(
      res => {
        this.prediction = res.prediction;
      },
      err => {
        console.error(err);
      }
    );
  }
}