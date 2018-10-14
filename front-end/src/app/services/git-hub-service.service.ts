import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitHubServiceService {

  accessToken:String = '';

  constructor(private http: HttpClient) { }

  setAccessToken(tokenObj){  
      console.log(tokenObj.data);
      this.accessToken = tokenObj.data; 
  }

  getAccessToken(){
    return this.accessToken;
  }

  genrateAccessToken(code:String) {
    return this.http.post("http://localhost:5005/token", {"code":code});
  }

  genarateUserData(){
    return this.http.post("http://localhost:5005/data", {"accessToken":this.getAccessToken()});
  }

  getRepoDetials(sourceURL:any){
    return this.http.get(sourceURL);
  }
}
