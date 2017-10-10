import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  post: Post = new Post();
  user_id: String = this._cookieService.get('userID');
  constructor(private _postService: PostService,
    private _router: Router, private _cookieService: CookieService ) { }

  ngOnInit() {

  }

  newPost(e: Event){
    e.stopPropagation();
    this.post.creator = this.user_id;
    console.log('sending post to db', this.post);
    this._postService.createPost(this.post, (result)=>{
      console.log('created new post in the db', result);
      this.post = result;
      this._router.navigate(['/listings']);
      // tried to use this to reload the page but it doesn't work.
      // I know this would be better handled with Subjects,
      // but there were no examples of these in the course content
      alert('Post added! Please refresh your page to see it below.');

    });
  }
}
