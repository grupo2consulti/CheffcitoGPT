import { Injectable } from '@angular/core';
import OpenAI from "openai";
import {environment} from "../../../environments/environment";


interface Message {
  role: 'system' | 'user' | 'assistant';
  content: any;
}

@Injectable({
  providedIn: 'root',
})
export class ImageReviewService {
  private apiKey: string = environment.apiKey;

  constructor() {}
  openai = new OpenAI({apiKey: this.apiKey,dangerouslyAllowBrowser: true});

  private async encodeImage(imagePath: string): Promise<string> {
    const res = await fetch(imagePath);
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }


  private async getMessagesImagesToList(imagePaths: string): Promise<Message[]> {
    const imagePathFt1 = './assets/images/ft1.jpg';
    const imagePathFt2 = './assets/images/ft2.jpg';
    const imagePathFt3 = './assets/images/ft3.jpg';
    const imagePathFt4 = './assets/images/ft4.jpg';

    return [
      {
        role: 'system',
        content:
          'You are an AI that is going to review an image that may contain fruits, ingredients, or anything related to food.' +
          ' Your task is to analyze the image and deliver a list of all the ingredients present. ' +
          'Also, you must validate that the image is valid and actually contains food.',
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": "List the foods, calories, healthyLevels in the image"
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${await this.encodeImage(imagePathFt1)}`,
            },
          },
        ],
      },
      {
        role: 'assistant',
        content: `{
          "id": 1,
          "isValid": true,
          "numberFoods": 10,
          "list": [
            { "food": "fish", "calories": 200, "healthyLevel": "HIGH"  },
            { "food": "beef", "calories": 250, "healthyLevel": "MEDIUM" },
            { "food": "salmon", "calories": 300, "healthyLevel": "HIGH" },
            { "food": "egg", "calories": 70, "healthyLevel": "HIGH" },
            { "food": "bell pepper", "calories": 30, "healthyLevel": "HIGH" },
            { "food": "lettuce", "calories": 15, "healthyLevel": "MEDIUM" },
            { "food": "walnuts", "calories": 200, "healthyLevel": "HIGH" },
            { "food": "bread", "calories": 250, "healthyLevel": "MEDIUM" },
            { "food": "apple", "calories": 80, "healthyLevel": "HIGH" },
            { "food": "milk", "calories": 120, "healthyLevel": "MEDIUM" }
          ]
        }`,
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": "List the foods, calories, healthyLevels in the image"
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${await this.encodeImage(imagePathFt2)}`,
            },
          },
        ],
      },
      {
        role: 'assistant',
        content: `{
          "id": 2,
          "isValid": true,
          "numberFoods": 9,
          "list": [
            { "food": "lettuce", "calories": 15, "healthyLevel": "HIGH" },
            { "food": "bell pepper", "calories": 30, "healthyLevel": "MEDIUM" },
            { "food": "tomato", "calories": 25, "healthyLevel": "HIGH" },
            { "food": "water", "calories": 0, "healthyLevel": "HIGH" },
            { "food": "egg", "calories": 70, "healthyLevel": "HIGH" },
            { "food": "milk", "calories": 120, "healthyLevel": "MEDIUM" },
            { "food": "lemon", "calories": 20, "healthyLevel": "MEDIUM" },
            { "food": "celery", "calories": 10, "healthyLevel": "MEDIUM" },
            { "food": "herbs", "calories": 5, "healthyLevel": "HIGH" }
          ]
        }`,
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": "List the foods in the image"
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${await this.encodeImage(imagePathFt3)}`,
            },
          },
        ],
      },
      {
        role: 'assistant',
        content: `{
          "id": 3,
          "isValid": false,
          "numberFoods": 0,
          "list": []
        }`,
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": "List the foods, calories, healthyLevels in the image"
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${await this.encodeImage(imagePathFt4)}`,
            },
          },
        ],
      },
      {
        role: 'assistant',
        content: `{
          "id": 4,
          "isValid": true,
          "numberFoods": 8,
          "list": [
          { "food": "bread", "calories": 250, "healthyLevel": "HIGH" },
          { "food": "cereal", "calories": 150, "healthyLevel": "LOW" },
          { "food": "water", "calories": 0, "healthyLevel": "HIGH" },
          { "food": "canned soup", "calories": 100, "healthyLevel": "HIGH" },
          { "food": "soda", "calories": 140, "healthyLevel": "LOW" },
          { "food": "cookies", "calories": 200, "healthyLevel": "HIGH" },
          { "food": "pasta", "calories": 220, "healthyLevel": "LOW" },
          { "food": "canned fruit", "calories": 90, "healthyLevel": "MEDIUM" }
          ]
        }`,
      },
      {
        role: 'user',
        content: [
          {
            "type": "text",
            "text": "List the foods, calories, healthyLevels in the image, responds to the 'food' tag of the Json in Spanish."
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${await this.encodeImage(imagePaths)}`,
            },
          },
        ],
      }
    ];
  }

  public async sendImageReviewRequest(imagePaths: string) {
    const messagesSend = await this.getMessagesImagesToList(imagePaths);
    const messagesGet = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages:  messagesSend,
    });
    return JSON.parse(messagesGet.choices[0].message.content+'');
  }
}
