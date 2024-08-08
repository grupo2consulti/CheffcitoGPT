import {Component, Input} from '@angular/core';
import {ImageReviewService} from "../service/openAI/image-review.service";

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent  {
   name?: any;


  constructor(private imageReviewService: ImageReviewService ) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        this.imageReviewService.sendImageReviewRequest(imageUrl)
          .then(async response => {
            console.log(response)
            this.name = response
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };
      reader.readAsDataURL(file);
    }
  }

  protected readonly JSON = JSON;
}
