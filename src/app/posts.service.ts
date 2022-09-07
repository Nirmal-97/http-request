import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { map, Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class PostsService {
    error = new Subject

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content}
        this.http
          .post<{ name: string }>(
            'https://fir-project-40c4e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
            postData
          )
          .subscribe((responceData) => {
            console.log(responceData);
          }, error => {
              this.error.next(error.message);
          });
    }

    fetchPost() {
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
         
        });
    }

    deletePost() {
        return this.http.delete(
          'https://fir-project-40c4e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
        );
    }
}