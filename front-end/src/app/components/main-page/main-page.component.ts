import { Component, OnInit } from '@angular/core';
import { GitHubServiceService } from '../../services/git-hub-service.service'
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private gitService: GitHubServiceService) { }

  gitUserData: any = {};
  repoData: any = [];

  ngOnInit() {

    this.gitService.genrateAccessToken(new URLSearchParams(window.location.search).get('code'))
      .subscribe((data) => {
        console.log(data);
        this.gitService.setAccessToken(data);
        this.gitService.genarateUserData().subscribe((userData) => {
          console.log(userData);
          this.gitUserData = userData;
          this.gitService.getRepoDetials(this.gitUserData.repos_url).subscribe((repo) => {
            this.repoData = repo;
          });
        });
      });
  }
}
