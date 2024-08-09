import {Component, Input} from '@angular/core';
import {ImageReviewService} from "../service/openAiGpt/image-review.service";
import {ListReviewService} from "../service/openAiGpt/list-review.service";
import {RecipesReviewService} from "../service/openAiGpt/recipes-review.service";

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent  {
  name?: any;


  constructor(private imageReviewService: ImageReviewService, private listReviewService:ListReviewService, private recipesReviewService:RecipesReviewService) {}

  allergies:string[] = ['','Nothing']

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        this.imageReviewService.sendImageReviewRequest(imageUrl)
          .then(async response => {
            console.log(response)
            this.listReviewService.sendListReviewRequest(response.list,"Unlimited",this.allergies).then(async value => {
              console.log(value)
              let recipes;
              try {
                recipes = value.recipes[0];
              }catch (e){
                recipes = value.recetas[0]
              }
              this.recipesReviewService.sendRecipesReviewRequest(recipes).then(async value2 => {
                console.log(value2)
              })
            })
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
