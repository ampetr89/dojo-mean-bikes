import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { Post } from '../models/post';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  posts: Post[] = [];
  posts_filtered: Post[] = this.posts;
  search_term: string = "";
  user: String;
  constructor(private _postService: PostService,
    private _cookieservice: CookieService,
    private _authService: AuthService,
    private _router: Router
    ) { }

  ngOnInit() {
    this._postService.getPosts({}, // provide an empty filter to get all listings
      (result)=>{
        this.posts = result;
        this.search();
      }) ;

    this.user = this._cookieservice.get('userID');
  }

  showContact(post: Post){
    console.log('getting contact info for', post.creator);
    this._authService.getUser(post.creator)
      .then(user => {
        let creator: User = user
        alert(`Name: ${creator.name}\nEmail: ${creator.email}\nListing. Id: ${post._id}`)
       })
      .catch(err=>console.log('Error getting post creator contact info', err));
  }

  search(){
    console.log('searching')
    if(this.search_term.length==0){
      this.posts_filtered = this.posts
    }else{
      this.posts_filtered = this.posts.filter(
        post => {
          return post.title.toLowerCase().indexOf(
            this.search_term.toLowerCase()) >= 0
        })
    }

  }

  logout(){
    // TODO: confirm boxes dont show on mobile
    let sure = confirm('Are you sure you want to log out?') ;
    console.log('sure',sure);
    if(sure){
      this._authService.logout()
        .then(()=>{
          console.log('logged out');
          this._router.navigate(['/welcome/login']);
        });
    }
  }


}
