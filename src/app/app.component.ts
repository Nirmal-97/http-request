import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    // this.fetchPost();
    // this.postsService.error.subscribe(errorMessage => {
    //   this.error = errorMessage
    // }
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // this.http
    //   .post<{name: string}>(
    //     'https://fir-project-40c4e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
    //     postData
    //   )
    //   .subscribe((responceData) => {
    //     console.log(responceData);
    //   });

    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
    // this.postsService.fetchPost().subscribe((posts: Post[]) => {
    //   this.isFetching = false;
    //   this.loadedPosts = posts;
    // }, (error: { message: null; }) => {
    //   this.error = error.message;
    // })
  }  

  onClearPosts() {
    // Send Http request
  }

  private fetchPost() {
    this.isFetching = true
    // this.http
    //   .get<{ [key: string]: Post}>(
    //     'https://fir-project-40c4e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
    //   )
    //   .pipe(
    //     map((responceData) => {
    //       const postArray = [];
    //       for (const key in responceData) {
    //         if (responceData.hasOwnProperty(key)) {
    //           postArray.push({ ...responceData[key], id: key });
    //         }
    //       }
    //       return postArray;
    //     })
    //   )
    //   .subscribe((posts) => {
    //     this.isFetching = false
    //     this.loadedPosts = posts;
    //   });

    this.postsService.fetchPost();
  }

  onClearPost() {
    this.postsService.deletePost().subscribe(() => {
      this.loadedPosts = []
    });  
  }
}
