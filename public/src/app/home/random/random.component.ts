import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  constructor(private _postService: PostService) { }

  post: Post;
  ngOnInit() {
    this._postService.randomPost(
      post => {
        this.post = post;
      })

  }

}
