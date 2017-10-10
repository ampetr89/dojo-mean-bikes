import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CookieService } from 'ngx-cookie-service';
import { Post } from '../../models/post';


@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  posts: Post[];
  editing: Boolean = undefined;
  user_id: String = this._cookieService.get('userID');
  errors: any;
  constructor(private _postService: PostService,
    private _cookieService: CookieService) {
    }

  refreshPosts(){
    this._postService.getPosts({creator: this.user_id}, // filter to this user
      (result)=>{
        console.log('refreshed posts');
        this.posts = result
      }) ;
   }
  ngOnInit() {
    this.refreshPosts();
    console.log('editing',this.editing);
  }

  formToJSON(elements) {
    let data: Object = {};
    for(let elem of elements){
      data[elem['name']] = elem['value'];
    }
    return data;
  }
  updatePost(post, e: Event){
    // cant do 2-way binding since there are an arbitrary number of forms
    // on this page, so we just scrape the form values:
    this.disableEdit();
    let form_data = this.formToJSON(e.target['elements']);
    let edited_post = new Post(post._id, form_data['title'], form_data['price'],
      form_data['description'], form_data['location'], form_data['img_url'], post.creator)
    this._postService.updatePost(edited_post,
      (result)=>{
        console.log('result from updating post', result);
        this.refreshPosts();

        },
       (error)=>{
         this.errors = error;
       }
        )
  }
  deletePost(post){
    let sure = confirm('Are you sure you would like to delete this post?');

    if(sure){
       this._postService.deletePost(post,
        (result)=>{
          console.log('result from deleting post', result);
          this.refreshPosts() })
    }

  }

  enableEdit(post_id){
    this.editing = post_id;
  }
  disableEdit(){
    this.editing = undefined;
  }

}
