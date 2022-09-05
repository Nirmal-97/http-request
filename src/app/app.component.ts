import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{name: string}>(
        'https://fir-project-40c4e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        postData
      )
      .subscribe((responceData) => {
        console.log(responceData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPost() {
    this.isFetching = true
    this.http
      .get<{ [key: string]: Post}>(
        'https://fir-project-40c4e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
      )
      .pipe(
        map((responceData) => {
          const postArray = [];
          for (const key in responceData) {
            if (responceData.hasOwnProperty(key)) {
              postArray.push({ ...responceData[key], id: key });
            }
          }
          return postArray;
        })
      )
      .subscribe((posts) => {
        this.isFetching = false
        this.loadedPosts = posts;
      });
  }
}
