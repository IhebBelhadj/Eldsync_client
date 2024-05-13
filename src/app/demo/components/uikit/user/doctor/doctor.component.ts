import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DoctorComponent {
    selectedFile: File;
    prediction: string;

    constructor(private http: HttpClient) { }

    onFileChanged(event) {
        if (event.target.files.length > 0) {
            this.selectedFile = event.target.files[0];
        }
    }

    onUpload() {
        if (!this.selectedFile) {
            return; // No file selected, handle accordingly
        }

        console.log('Uploading file:', this.selectedFile);

        const formData = new FormData();
        formData.append('image', this.selectedFile);

        this.http.post<any>('http://localhost:5000/predict', formData).subscribe(
            res => {
                this.prediction = res.prediction;
                console.log('Prediction result:', this.prediction);
            },
            err => {
                console.error('Prediction error:', err);
            }
        );
    }
}
