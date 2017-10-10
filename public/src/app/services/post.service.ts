import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Http } from '@angular/http';

@Injectable()
export class PostService {

  posts: Post[];
  api: string = 'http://localhost:80/api/posts';

  constructor(private _http: Http) { }

  JSONtoQuery(obj: Object): String{
    var serialized: String[] = [];
    for(let k of Object.keys(obj)){
      serialized.push(`${k}=${obj[k]}`);
    }
    if (serialized.length > 0){
      return '?' + serialized.join('&')
    }else{
      return ''
    }

  }
  getPosts(filters: Object = {}, callback: Function){
    var url = this.api + this.JSONtoQuery(filters);
    console.log('GETTING', url);

    this._http.get(url) // eg you could filter by creator Id
      .subscribe(
        response => callback(response.json()),
        err => {console.log('error getting posts', err)}
       );
  }

  randomPost(callback: Function){
    let url = this.api + '/random';
    this._http.get(url)
      .subscribe(
        response => callback(response.json()),
        err => {console.log('error getting random post', err)}
       );
  }

  createPost(post: Post, callback: Function){
    delete post._id; // let mongo populate this
    this._http.post(this.api, post)
      .subscribe(
        response=> callback(response.json()),
        err => {console.log('error creating post', err)}
        )
  }

  updatePost(post: Post, callback: Function, errorHandler: Function){
    this._http.put(this.api+'/'+post['_id'], post)
      .subscribe(
        response=> callback(response.json()),
        err => errorHandler(err.json())
        )
  }

  deletePost(post: Post, callback: Function){
    this._http.delete(this.api+'/'+post['_id'])
      .subscribe(
        response=> callback(response.json()),
        err => {console.log('error deleting post', err)}
        )
  }

}
