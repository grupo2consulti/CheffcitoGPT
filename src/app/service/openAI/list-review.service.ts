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

  private  getMessagesImagesToList(listIngredinnts: string): Message[] {
    return [
      {
        role: 'system',
        content:
          'You are an AI tasked with reviewing a list of ingredients or any food-related items. ' +
          'Your task is to analyze this list and provide a selection of dishes that can be prepared with the ingredients present. ' +
          'In addition, you must validate that each item on the list is actually an ingredient or is related to food. ' +
          'If you find any item that does not correspond to ingredients or something related to food, ' +
          'ignore it for recipe creation.',
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": `{
   "list":[
      {
         "food":"fish",
         "calories":200,
         "healthyLevel":"HIGH"
      },
      {
         "food":"beef",
         "calories":250,
         "healthyLevel":"MEDIUM"
      },
      {
         "food":"salmon",
         "calories":300,
         "healthyLevel":"HIGH"
      },
      {
         "food":"egg",
         "calories":70,
         "healthyLevel":"HIGH"
      },
      {
         "food":"bell pepper",
         "calories":30,
         "healthyLevel":"HIGH"
      },
      {
         "food":"lettuce",
         "calories":15,
         "healthyLevel":"MEDIUM"
      },
      {
         "food":"walnuts",
         "calories":200,
         "healthyLevel":"HIGH"
      },
      {
         "food":"bread",
         "calories":250,
         "healthyLevel":"MEDIUM"
      },
      {
         "food":"apple",
         "calories":80,
         "healthyLevel":"HIGH"
      },
      {
         "food":"milk",
         "calories":120,
         "healthyLevel":"MEDIUM"
      }
   ]
}`
          },
        ],
      },
      {
        role: 'assistant',
        content: `{
  "recipes": [
    {
      "name": "Salmon and Walnut Salad",
      "ingredients": [
        "salmon",
        "bell pepper",
        "lettuce",
        "walnuts"
      ],
      "description": "A fresh and nutritious salad with grilled salmon, bell peppers, crispy lettuce, and toasted walnuts.",
      "totalCalories": 545,
      "healthLevel": "HIGH",
      "imageBase64": "iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAEAAElEQVR4nOz9aZMjSZIlCD5mFtEDgF1+REQeXUcf090zvfv//8AS..."
    },
    {
      "name": "Fish Tacos",
      "ingredients": [
        "fish",
        "bell pepper",
        "lettuce",
        "bread"
      ],
      "description": "Healthy fish tacos with grilled fish, bell peppers, lettuce, and a soft bread wrap.",
      "totalCalories": 495,
      "healthLevel": "MEDIUM"
    },
    {
      "name": "Egg and Apple Breakfast",
      "ingredients": [
        "egg",
        "apple",
        "bread",
        "milk"
      ],
      "description": "A nutritious breakfast with scrambled eggs, fresh apple slices, whole wheat bread, and a glass of milk.",
      "totalCalories": 520,
      "healthLevel": "MEDIUM"
    },
    {
      "name": "Beef and Walnut Salad",
      "ingredients": [
        "beef",
        "walnuts",
        "lettuce",
        "bell pepper"
      ],
      "description": "A hearty salad with grilled beef, walnuts, crispy lettuce, and bell peppers.",
      "totalCalories": 495,
      "healthLevel": "MEDIUM"
    },
    {
      "name": "Salmon and Apple Salad",
      "ingredients": [
        "salmon",
        "apple",
        "lettuce"
      ],
      "description": "A light and healthy salad with grilled salmon, fresh apple slices, and lettuce.",
      "totalCalories": 395,
      "healthLevel": "HIGH"
    }
  ]
}`,
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": `{
   "list":[
      {
         "food":"lettuce",
         "calories":15,
         "healthyLevel":"HIGH"
      },
      {
         "food":"bell pepper",
         "calories":30,
         "healthyLevel":"MEDIUM"
      },
      {
         "food":"tomato",
         "calories":25,
         "healthyLevel":"HIGH"
      },
      {
         "food":"water",
         "calories":0,
         "healthyLevel":"HIGH"
      },
      {
         "food":"egg",
         "calories":70,
         "healthyLevel":"HIGH"
      },
      {
         "food":"milk",
         "calories":0,
         "healthyLevel":null
      },
      {
         "food":"lemon",
         "calories":20,
         "healthyLevel":"MEDIUM"
      },
      {
         "food":"celery",
         "calories":10,
         "healthyLevel":"MEDIUM"
      },
      {
         "food":"herbs",
         "calories":0,
         "healthyLevel":null
      }
   ]
}`
          }
        ],
      },
      {
        role: 'assistant',
        content: `{
  "recipes": [
    {
      "name": "Fresh Veggie Salad",
      "ingredients": [
        "lettuce",
        "bell pepper",
        "tomato",
        "celery",
        "herbs"
      ],
      "description": "A crisp and refreshing salad with a mix of lettuce, bell pepper, tomato, celery, and a sprinkle of fresh herbs.",
      "totalCalories": 80,
      "healthLevel": "HIGH"
    },
    {
      "name": "Herb Omelette",
      "ingredients": [
        "egg",
        "herbs",
        "milk"
      ],
      "description": "A fluffy omelette made with fresh eggs, aromatic herbs, and a splash of milk for creaminess.",
      "totalCalories": 70,
      "healthLevel": "HIGH"
    },
    {
      "name": "Tomato and Bell Pepper Stir-fry",
      "ingredients": [
        "bell pepper",
        "tomato",
        "herbs"
      ],
      "description": "A quick stir-fry with juicy tomatoes, crunchy bell peppers, and a touch of herbs for extra flavor.",
      "totalCalories": 55,
      "healthLevel": "HIGH"
    },
    {
      "name": "Lemon and Herb Infused Water",
      "ingredients": [
        "water",
        "lemon",
        "herbs"
      ],
      "description": "A refreshing infused water with slices of lemon and a hint of herbs, perfect for hydration.",
      "totalCalories": 20,
      "healthLevel": "HIGH"
    },
    {
      "name": "Celery and Lemon Juice",
      "ingredients": [
        "celery",
        "lemon",
        "water"
      ],
      "description": "A detoxifying juice made with fresh celery, a squeeze of lemon, and water.",
      "totalCalories": 30,
      "healthLevel": "HIGH"
    }
  ]
}`,
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": `{
   "list":[
      {
         "food":"bread",
         "calories":250,
         "healthyLevel":"HIGH"
      },
      {
         "food":"cereal",
         "calories":150,
         "healthyLevel":"LOW"
      },
      {
         "food":"water",
         "calories":0,
         "healthyLevel":"HIGH"
      },
      {
         "food":"canned soup",
         "calories":100,
         "healthyLevel":"HIGH"
      },
      {
         "food":"soda",
         "calories":140,
         "healthyLevel":"LOW"
      },
      {
         "food":"cookies",
         "calories":200,
         "healthyLevel":"HIGH"
      },
      {
         "food":"pasta",
         "calories":220,
         "healthyLevel":"LOW"
      },
      {
         "food":"canned fruit",
         "calories":90,
         "healthyLevel":"MEDIUM"
      }
   ]
}`
          }
        ],
      },
      {
        role: 'assistant',
        content: `{
  "recipes": [
    {
      "name": "Simple Bread and Canned Soup",
      "ingredients": [
        "bread",
        "canned soup"
      ],
      "description": "A quick and easy meal combining a slice of bread with a serving of canned soup.",
      "totalCalories": 350,
      "healthLevel": "HIGH"
    },
    {
      "name": "Pasta with Canned Fruit Dessert",
      "ingredients": [
        "pasta",
        "canned fruit"
      ],
      "description": "A simple pasta dish followed by a serving of canned fruit for dessert.",
      "totalCalories": 310,
      "healthLevel": "LOW"
    },
    {
      "name": "Cereal and Cookies Snack",
      "ingredients": [
        "cereal",
        "cookies"
      ],
      "description": "A quick snack pairing a bowl of cereal with some cookies.",
      "totalCalories": 350,
      "healthLevel": "LOW"
    }
  ]
}`,
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": `"list": [
        {
            "food": "cheese",
            "calories": 300,
            "healthyLevel": "MEDIUM"
        },
        {
            "food": "pineapple",
            "calories": 50,
            "healthyLevel": "HIGH"
        },
        {
            "food": "ham",
            "calories": 150,
            "healthyLevel": "MEDIUM"
        },
        {
            "food": "masa",
            "calories": 200,
            "healthyLevel": "LOW"
        },
        {
            "food": "ketchup",
            "calories": 80,
            "healthyLevel": "HIGH"
        }
    ]`
          },
        ],
      },
      {
        role: 'assistant',
        content: `{
  "recipes": [
    {
      "name": "Ham and Cheese Pineapple Sandwich",
      "ingredients": [
        "cheese",
        "pineapple",
        "ham",
        "masa"
      ],
      "description": "A delicious sandwich made with layers of ham and cheese topped with sweet pineapple, served on masa.",
      "totalCalories": 700,
      "healthLevel": "MEDIUM"
    },
    {
      "name": "Pineapple and Cheese Delight",
      "ingredients": [
        "cheese",
        "pineapple"
      ],
      "description": "A simple and refreshing dish featuring cheese paired with sweet pineapple slices.",
      "totalCalories": 350,
      "healthLevel": "MEDIUM"
    },
    {
      "name": "Ham and Ketchup Wrap",
      "ingredients": [
        "ham",
        "ketchup",
        "masa"
      ],
      "description": "A quick wrap made with slices of ham and a drizzle of ketchup wrapped in masa.",
      "totalCalories": 230,
      "healthLevel": "MEDIUM"
    }
  ]
}`,
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": "List the foods, calories, healthyLevels in the image, responds to the 'food' tag of the Json in Spanish."
          }
        ],
      }
    ];
  }
}
