import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangePasswordRequest } from '../model/ChangePasswordRequest';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from './auth.service';
import { AddUserRequest } from '../model/AddUserRequest ';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8081/api'; // L'URL de base de votre backend

  constructor(private httpClient: HttpClient,private authservice:AuthService,private sanitizer: DomSanitizer) { }

  addUser(user:User){

        // Utilisez les en-têtes définis pour l'envoi de données
    return this.httpClient.post<User>(`${this.baseUrl}/AddUser`,user);
  }
  public getUserById(id:number){
    return this.httpClient.get<User>("http://localhost:8081/api/FindUserId/"+id)
  }
  getUserIdFromUsername(username: string): Observable<number> {
    return this.httpClient.get<number>('http://localhost:8081/api/getttuser/id', { params: { username } });
  }

  public getAllUsers(){
    return this.httpClient.get<User[]>(this.baseUrl + "/FindAllUsers")
  }
  updateUser(user: User): Observable<User> {
    // Assuming your backend API endpoint for updating user is /api/EldSync/User/UpdateUser/:id
    return this.httpClient.put<User>(`${this.baseUrl}/UpdateUser/${user.id}`, user);
  }


  /*searchUsers(searchTerm: any): Observable<User[]> {
    // Convertir l'objet searchTerm en chaîne de requête  pour l'URL
    let queryString = Object.keys(searchTerm)
      .filter(key => searchTerm[key]) // Exclure les clés vides ou nulles
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(searchTerm[key]))
      .join('&');

    // Exécuter la requête HTTP GET avec la chaîne de requête
    return this.httpClient.get<User[]>(${this.baseUrl}?${queryString});
  }*/
  public deleteUser(id:number){
   return this.httpClient.delete("http://localhost:8081/api"+"/DeleteUser/"+id);
    }

    changePassword(request: ChangePasswordRequest): Observable<any> {
      const token = this.authservice.getToken();
      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
      return this.httpClient.post(`${this.baseUrl}/change-password`, request,{headers});
    }


    /*getEventBanner(eventId: number): Observable<SafeUrl> {
      return this.httpClient.get(`${this.baseUrl}/userBanner/${eventId}`, { responseType: 'blob' }).pipe(
        map(blob => {
          const urlCreator = window.URL || window.webkitURL;
          const imageUrl = urlCreator.createObjectURL(blob);
          return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
        })
      );
    }


    updateEvent(id: number, user: User, file?: File): Observable<User> {
      const formData: FormData = new FormData();
      formData.append('user', new Blob([JSON.stringify(user)], {type: 'application/json'}));
  
      if (file) {
        formData.append('file', file);
      }
  
      return this.httpClient.put<User>(`${this.baseUrl}/updateUser/${id}`, formData);
    }*/

    addUserWithRoles(addUserRequest: AddUserRequest): Observable<any> {
      
      return this.httpClient.post<any>(`${this.baseUrl}/addUserWithRoles`, addUserRequest);
    }


    addServicesToElder(userId: number, service: string): Observable<any> {
      return this.httpClient.get<any>(`${this.baseUrl}/users/addServices/${userId}/${service}`);
    }

    uploadImage(fileImage: File, id: string): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('fileImage', fileImage, fileImage.name);
  
      const headers = new HttpHeaders({
        'Requestor-Type': 'angular', // Exemple de header personnalisé
      });
  
      return this.httpClient.post(
        `http://localhost:8081/api/dashboard/clubs/uploadImage/${id}`,formData,{ headers }
      );
    }

}