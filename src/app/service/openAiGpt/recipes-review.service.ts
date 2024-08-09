import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import OpenAI from "openai";

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: any;
}


@Injectable({
  providedIn: 'root'
})
export class RecipesReviewService {

  private apiKey: string = environment.apiKey;

  constructor() {}
  openai = new OpenAI({apiKey: this.apiKey,dangerouslyAllowBrowser: true});

  private getMessagesImagesToList(recipes: any): Message[] {
    return [
      {
        role: 'system',
        content:
          'You are an AI tasked with reviewing and analyzing recipe information. ' +
          'Your job is to verify the name, ingredients, total calories, healthiness level, and preparation time. ' +
          'Additionally, you must provide all the information necessary to execute the recipe, ' +
          'including the time required, detailed steps, and any other relevant data.',
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `{
            "name":"Egg and Apple Breakfast",
            "ingredients":[
              "egg",
              "apple",
              "bread",
              "milk"
            ],
            "description":"A nutritious breakfast with scrambled eggs, fresh apple slices, whole wheat bread, and a glass of milk.",
            "totalCalories":520,
            "healthLevel":"MEDIUM",
            "preparationTime":"1:29:32"
          }`,
          },
        ],
      },
      {
        role: 'assistant',
        content: `{
        "suggestions": [
          {
            "suggestion": "The preparation time of 1 hour and 29 minutes seems excessive for a simple breakfast. Consider revising the time to a more realistic duration, such as 15 to 20 minutes."
          },
          {
            "suggestion": "Specify the method of cooking the egg (e.g., scrambled, fried) for clearer instructions."
          },
          {
            "suggestion": "Consider adding optional ingredients or variations, such as butter for the bread or cinnamon for the apple slices."
          }
        ],
        "instructions": [
          {
            "step": 1,
            "instruction": "Crack the eggs into a bowl and whisk until well combined.",
            "time": "00:02:00"
          },
          {
            "step": 2,
            "instruction": "Heat a non-stick pan over medium heat, pour in the eggs, and scramble until fully cooked.",
            "time": "00:05:00"
          },
          {
            "step": 3,
            "instruction": "Slice the apple into thin wedges or rings.",
            "time": "00:02:00"
          },
          {
            "step": 4,
            "instruction": "Toast the bread until golden brown.",
            "time": "00:03:00"
          },
          {
            "step": 5,
            "instruction": "Pour a glass of milk.",
            "time": "00:01:00"
          },
          {
            "step": 6,
            "instruction": "Serve the scrambled eggs with the apple slices, toasted bread, and a glass of milk.",
            "time": "00:02:00"
          }
        ],
        "adjustedPreparationTime": "00:15:00"
      }`,
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `{
            "name":"Salmon and Walnut Salad",
            "ingredients":[
              "salmon",
              "bell pepper",
              "lettuce",
              "walnuts"
            ],
            "description":"A fresh and nutritious salad with grilled salmon, bell peppers, crispy lettuce, and toasted walnuts.",
            "totalCalories":545,
            "healthLevel":"HIGH",
            "preparationTime":"0:31:32"
          }`,
          },
        ],
      },
      {
        role: 'assistant',
        content: `{
        "suggestions": [
          {
            "suggestion": "The preparation time of 31 minutes seems reasonable, but could be shortened depending on the method of cooking the salmon. If using pre-cooked or leftover salmon, the time could be reduced to around 15-20 minutes."
          },
          {
            "suggestion": "Specify whether the salmon should be grilled, baked, or pan-seared to guide the preparation method."
          },
          {
            "suggestion": "Consider adding a dressing or seasoning suggestion for the salad, such as a light vinaigrette or lemon juice."
          }
        ],
        "instructions": [
          {
            "step": 1,
            "instruction": "Preheat the grill or pan to medium-high heat.",
            "time": "00:05:00"
          },
          {
            "step": 2,
            "instruction": "Season the salmon with salt, pepper, and your preferred spices.",
            "time": "00:02:00"
          },
          {
            "step": 3,
            "instruction": "Grill or pan-sear the salmon for about 4-5 minutes per side until fully cooked.",
            "time": "00:10:00"
          },
          {
            "step": 4,
            "instruction": "While the salmon is cooking, wash and chop the lettuce and bell peppers.",
            "time": "00:05:00"
          },
          {
            "step": 5,
            "instruction": "Toast the walnuts in a dry pan over medium heat for about 2-3 minutes, stirring frequently.",
            "time": "00:03:00"
          },
          {
            "step": 6,
            "instruction": "Once the salmon is cooked, let it cool slightly and then flake it into bite-sized pieces.",
            "time": "00:03:00"
          },
          {
            "step": 7,
            "instruction": "In a large bowl, combine the lettuce, bell peppers, walnuts, and flaked salmon.",
            "time": "00:03:00"
          },
          {
            "step": 8,
            "instruction": "Serve the salad immediately, with dressing or seasoning of your choice.",
            "time": "00:02:00"
          }
        ],
        "adjustedPreparationTime": "00:30:00"
      }`,
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `{
            "name":"Egg and Apple Breakfast",
            "ingredients":[
              "egg",
              "apple",
              "bread",
              "milk"
            ],
            "description":"A nutritious breakfast with scrambled eggs, fresh apple slices, whole wheat bread, and a glass of milk.",
            "totalCalories":520,
            "healthLevel":"MEDIUM",
            "preparationTime":"1:29:32"
          }`,
          },
        ],
      },
      {
        role: 'assistant',
        content: `{
        "suggestions": [
          {
            "suggestion": "The preparation time of 1 hour and 29 minutes is excessive for a simple breakfast. Consider revising the time to a more realistic duration, such as 15 to 20 minutes."
          },
          {
            "suggestion": "Specify the method of cooking the egg (e.g., scrambled, fried) for clearer instructions."
          },
          {
            "suggestion": "Consider adding optional ingredients or variations, such as butter for the bread or cinnamon for the apple slices."
          }
        ],
        "instructions": [
          {
            "step": 1,
            "instruction": "Crack the eggs into a bowl and whisk until well combined.",
            "time": "00:02:00"
          },
          {
            "step": 2,
            "instruction": "Heat a non-stick pan over medium heat, pour in the eggs, and scramble until fully cooked.",
            "time": "00:05:00"
          },
          {
            "step": 3,
            "instruction": "Slice the apple into thin wedges or rings.",
            "time": "00:02:00"
          },
          {
            "step": 4,
            "instruction": "Toast the bread until golden brown.",
            "time": "00:03:00"
          },
          {
            "step": 5,
            "instruction": "Pour a glass of milk.",
            "time": "00:01:00"
          },
          {
            "step": 6,
            "instruction": "Serve the scrambled eggs with the apple slices, toasted bread, and a glass of milk.",
            "time": "00:02:00"
          }
        ],
        "adjustedPreparationTime": "00:15:00"
      }`,
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `{
            "name":"Pineapple and Cheese Delight",
            "ingredients":[
              "cheese",
              "pineapple"
            ],
            "description":"A simple and refreshing dish featuring cheese paired with sweet pineapple slices.",
            "totalCalories":350,
            "healthLevel":"MEDIUM",
            "preparationTime":"2:00:32"
          }`,
          },
        ],
      },
      {
        role: 'assistant',
        content: `{
        "suggestions": [
          {
            "suggestion": "The preparation time of 2 hours is excessive for a simple dish with cheese and pineapple. Consider revising the time to a more realistic duration, such as 5 to 10 minutes."
          },
          {
            "suggestion": "Specify the type of cheese to be used (e.g., cheddar, cream cheese) to better guide the flavor and texture of the dish."
          }
        ],
        "instructions": [
          {
            "step": 1,
            "instruction": "Cut the cheese into slices or cubes as preferred.",
            "time": "00:03:00"
          },
          {
            "step": 2,
            "instruction": "Cut the pineapple into slices or small chunks.",
            "time": "00:03:00"
          },
          {
            "step": 3,
            "instruction": "On a plate, alternate the pieces of cheese with the pineapple slices or chunks.",
            "time": "00:02:00"
          },
          {
            "step": 4,
            "instruction": "Serve immediately or refrigerate for a few minutes for a more refreshing experience.",
            "time": "00:02:00"
          }
        ],
        "adjustedPreparationTime": "00:10:00"
      }`,
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": "Responds in Spanish."
          },
          {
            type: 'text',
            text: `${JSON.stringify(recipes)}`,
          },
        ],
      },
    ];
  }

  public async sendRecipesReviewRequest(recipes: any) {
    const messagesSend = this.getMessagesImagesToList(recipes);
    console.log(messagesSend)
    const messagesGet = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages:  messagesSend,
    });
    return JSON.parse(messagesGet.choices[0].message.content+'');
  }

}
