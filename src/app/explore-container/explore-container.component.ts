import { Component, Input } from '@angular/core';
import { ImageReviewService } from '../service/openAI/image-review.service';
import { GenerateImageService } from '../service/openAI/generate-image.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  name?: any;
  imageSrc: string = '';

  constructor(
    private imageReviewService: ImageReviewService,
    private generateImageService: GenerateImageService
  ) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        this.imageReviewService
          .sendImageReviewRequest(imageUrl)
          .then(async (response) => {
            console.log(response);
            this.name = response;
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
      reader.readAsDataURL(file);
    }
  }

  onClickGenerateImage() {
    this.generateImageService
      .generateImage('Pizza with pepperoni and mushrooms')
      .then(async (response) => {
        console.log(response);
        this.imageSrc = `data:image/png;base64,${response}`;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  protected readonly JSON = JSON;
}
