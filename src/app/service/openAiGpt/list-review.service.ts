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
export class ListReviewService {

  private apiKey: string = environment.apiKey;

  constructor() {}
  openai = new OpenAI({apiKey: this.apiKey,dangerouslyAllowBrowser: true});

  private getMessagesImagesToList(listIngredients: any,time: string,allergies: any): Message[] {
    return [
      {
        role: 'system',
        content:
          'You are an AI tasked with reviewing a list of ingredients or any food-related items. ' +
          'Your task is to analyze this list and provide a selection of dishes that can be prepared with the ingredients present. ' +
          'In addition, you must validate that each item on the list is actually an ingredient or is related to food. ' +
          'If you find any item that does not correspond to ingredients or something related to food, ' +
          'ignore it for recipe creation. Responds all tags of the Json only in Spanish.',
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": `{
                        "list":[
                            {"food":"fish","calories":200,"healthyLevel":"HIGH"},
                            {"food":"beef","calories":250,"healthyLevel":"MEDIUM"},
                            {"food":"salmon","calories":300,"healthyLevel":"HIGH"},
                            {"food":"egg","calories":70,"healthyLevel":"HIGH"},
                            {"food":"bell pepper","calories":30,"healthyLevel":"HIGH"},
                            {"food":"lettuce","calories":15,"healthyLevel":"MEDIUM"},
                            {"food":"walnuts","calories":200,"healthyLevel":"HIGH"},
                            {"food":"bread","calories":250,"healthyLevel":"MEDIUM"},
                            {"food":"apple","calories":80,"healthyLevel":"HIGH"},
                            {"food":"milk","calories":120,"healthyLevel":"MEDIUM"}
                        ]
                    }`
          }
        ]
      },
      {
        role: 'assistant',
        content: `{
                "recipes": [
                    {
                        "name": "Salmon and Walnut Salad",
                        "ingredients": ["salmon", "bell pepper", "lettuce", "walnuts"],
                        "description": "A fresh and nutritious salad with grilled salmon, bell peppers, crispy lettuce, and toasted walnuts.",
                        "totalCalories": 545,
                        "healthLevel": "HIGH",
                        "preparationTime" :"0:31:32"
                    },
                    {
                        "name": "Fish Tacos",
                        "ingredients": ["fish", "bell pepper", "lettuce", "bread"],
                        "description": "Healthy fish tacos with grilled fish, bell peppers, lettuce, and a soft bread wrap.",
                        "totalCalories": 495,
                        "healthLevel": "MEDIUM",
                        "preparationTime" :"1:50:32"
                    },
                    {
                        "name": "Egg and Apple Breakfast",
                        "ingredients": ["egg", "apple", "bread", "milk"],
                        "description": "A nutritious breakfast with scrambled eggs, fresh apple slices, whole wheat bread, and a glass of milk.",
                        "totalCalories": 520,
                        "healthLevel": "MEDIUM",
                        "preparationTime" :"1:29:32"
                    },
                    {
                        "name": "Beef and Walnut Salad",
                        "ingredients": ["beef", "walnuts", "lettuce", "bell pepper"],
                        "description": "A hearty salad with grilled beef, walnuts, crispy lettuce, and bell peppers.",
                        "totalCalories": 495,
                        "healthLevel": "MEDIUM",
                        "preparationTime" :"1:40:32"
                    },
                    {
                        "name": "Salmon and Apple Salad",
                        "ingredients": ["salmon", "apple", "lettuce"],
                        "description": "A light and healthy salad with grilled salmon, fresh apple slices, and lettuce.",
                        "totalCalories": 395,
                        "healthLevel": "HIGH",
                        "preparationTime" :"1:40:32"
                    }
                ]
            }`
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": `{
                        "list":[
                            {"food":"lettuce","calories":15,"healthyLevel":"HIGH"},
                            {"food":"bell pepper","calories":30,"healthyLevel":"MEDIUM"},
                            {"food":"tomato","calories":25,"healthyLevel":"HIGH"},
                            {"food":"water","calories":0,"healthyLevel":"HIGH"},
                            {"food":"egg","calories":70,"healthyLevel":"HIGH"},
                            {"food":"milk","calories":0,"healthyLevel":null},
                            {"food":"lemon","calories":20,"healthyLevel":"MEDIUM"},
                            {"food":"celery","calories":10,"healthyLevel":"MEDIUM"},
                            {"food":"herbs","calories":0,"healthyLevel":null}
                        ]
                    }`
          }
        ]
      },
      {
        role: 'assistant',
        content: `{
                "recipes": [
                    {
                        "name": "Fresh Veggie Salad",
                        "ingredients": ["lettuce", "bell pepper", "tomato", "celery", "herbs"],
                        "description": "A crisp and refreshing salad with a mix of lettuce, bell pepper, tomato, celery, and a sprinkle of fresh herbs.",
                        "totalCalories": 80,
                        "healthLevel": "HIGH",
                        "preparationTime" :"0:12:12"
                    },
                    {
                        "name": "Herb Omelette",
                        "ingredients": ["egg", "herbs", "milk"],
                        "description": "A fluffy omelette made with fresh eggs, aromatic herbs, and a splash of milk for creaminess.",
                        "totalCalories": 70,
                        "healthLevel": "HIGH",
                        "preparationTime" :"4:10:1"
                    },
                    {
                        "name": "Tomato and Bell Pepper Stir-fry",
                        "ingredients": ["bell pepper", "tomato", "herbs"],
                        "description": "A quick stir-fry with juicy tomatoes, crunchy bell peppers, and a touch of herbs for extra flavor.",
                        "totalCalories": 55,
                        "healthLevel": "HIGH",
                        "preparationTime" :"0:12:03"
                    },
                    {
                        "name": "Lemon and Herb Infused Water",
                        "ingredients": ["water", "lemon", "herbs"],
                        "description": "A refreshing infused water with slices of lemon and a hint of herbs, perfect for hydration.",
                        "totalCalories": 20,
                        "healthLevel": "HIGH",
                        "preparationTime" :"0:15:30"
                    },
                    {
                        "name": "Celery and Lemon Juice",
                        "ingredients": ["celery", "lemon", "water"],
                        "description": "A detoxifying juice made with fresh celery, a squeeze of lemon, and water.",
                        "totalCalories": 30,
                        "healthLevel": "HIGH",
                        "preparationTime" :"0:10:50"
                    }
                ]
            }`
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": `{
                        "list":[
                            {"food":"bread","calories":250,"healthyLevel":"HIGH"},
                            {"food":"cereal","calories":150,"healthyLevel":"LOW"},
                            {"food":"water","calories":0,"healthyLevel":"HIGH"},
                            {"food":"canned soup","calories":100,"healthyLevel":"HIGH"},
                            {"food":"soda","calories":140,"healthyLevel":"LOW"},
                            {"food":"cookies","calories":200,"healthyLevel":"HIGH"},
                            {"food":"pasta","calories":220,"healthyLevel":"LOW"},
                            {"food":"canned fruit","calories":90,"healthyLevel":"MEDIUM"}
                        ]
                    }`
          }
        ]
      },
      {
        role: 'assistant',
        content: `{
                "recipes": [
                    {
                        "name": "Simple Bread and Canned Soup",
                        "ingredients": ["bread", "canned soup"],
                        "description": "A quick and easy meal combining a slice of bread with a serving of canned soup.",
                        "totalCalories": 350,
                        "healthLevel": "HIGH",
                        "preparationTime" :"0:30:00"
                    },
                    {
                        "name": "Pasta with Canned Fruit Dessert",
                        "ingredients": ["pasta", "canned fruit"],
                        "description": "A simple pasta dish followed by a serving of canned fruit for dessert.",
                        "totalCalories": 310,
                        "healthLevel": "LOW",
                        "preparationTime" :"1:15:00"
                    },
                    {
                        "name": "Cereal and Cookies Snack",
                        "ingredients": ["cereal", "cookies"],
                        "description": "A quick snack pairing a bowl of cereal with some cookies.",
                        "totalCalories": 350,
                        "healthLevel": "LOW",
                        "preparationTime" :"1:25:00"
                    }
                ]
            }`
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": `{
                       "list": [
                         {"food": "cheese","calories": 300,"healthyLevel": "MEDIUM"},
                         {"food": "pineapple","calories": 50,"healthyLevel": "HIGH"},
                         {"food": "ham","calories": 150,"healthyLevel": "MEDIUM"},
                         {"food": "masa","calories": 200,"healthyLevel": "LOW"},
                         {"food": "ketchup","calories": 80,"healthyLevel": "HIGH"}
                       ]
                    }`
          }
        ]
      },
      {
        role: 'assistant',
        content: `{
                "recipes": [
                    {
                        "name": "Ham and Cheese Pineapple Sandwich",
                        "ingredients": ["cheese", "pineapple", "ham", "masa"],
                        "description": "A delicious sandwich made with layers of ham and cheese topped with sweet pineapple, served on masa.",
                        "totalCalories": 700,
                        "healthLevel": "MEDIUM",
                        "preparationTime" :"3:03:32"
                    },
                    {
                        "name": "Pineapple and Cheese Delight",
                        "ingredients": ["cheese", "pineapple"],
                        "description": "A simple and refreshing dish featuring cheese paired with sweet pineapple slices.",
                        "totalCalories": 350,
                        "healthLevel": "MEDIUM",
                        "preparationTime" :"2:00:32"
                    },
                    {
                        "name": "Ham and Ketchup Wrap",
                        "ingredients": ["ham", "ketchup", "masa"],
                        "description": "A quick wrap made with slices of ham and a drizzle of ketchup wrapped in masa.",
                        "totalCalories": 230,
                        "healthLevel": "MEDIUM",
                        "preparationTime" :"0:30:32"
                    }
                ]
            }`
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": `Also, make sure your recipes are prepared no later than ${time} (HH) and be aware of my allergies: ${allergies.join(', ')}. Responds all tags of the Json only in Spanish.`
          },
          {
            "type": "text",
            "text": `${JSON.stringify(listIngredients)}`
          }
        ]
      }
    ];
  }

  public async sendListReviewRequest(listIngredients: any,time: string,allergies: any) {
    const messagesSend = this.getMessagesImagesToList(listIngredients,time,allergies);
    console.log(messagesSend)
    const messagesGet = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages:  messagesSend,
    });
    return JSON.parse(messagesGet.choices[0].message.content+'');
  }

}
