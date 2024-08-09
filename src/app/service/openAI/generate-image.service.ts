import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class GenerateImageService {
  private apiKey: string = environment.apiKey;
  constructor() {}

  public async generateImage(prompt: string): Promise<string> {
    const response = await fetch(
      'https://api.openai.com/v1/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
        }),
      }
    );
    const data = await response.json();
    console.log(data?.data?.[0]?.url);
    const imageBase64 = await this.encodeImage(data?.data?.[0]?.url) || '';
    return imageBase64;
  }

  //Convert the image to base64
  private async encodeImage(imagePath: string): Promise<string> {
    try {
      const res = await fetch(imagePath);
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      const blob = await res.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = (reader.result as string).split(',')[1];
          resolve(base64String);
        };
        reader.onerror = (error) => {
          reject(new Error(`FileReader error: ${error}`));
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error encoding image:', error);
      throw error;
    }
  }
  
}
