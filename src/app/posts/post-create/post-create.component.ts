import { Component} from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from '../post.service';
import * as moment from 'moment';
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postsService:PostsService){

  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let formatted_date = moment(form.value.title).format("YYYY-MM-DD");
    console.log(formatted_date);

    this.postsService.addPost(formatted_date,form.value.content);
    form.resetForm();
  }
}
