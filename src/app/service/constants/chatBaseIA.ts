interface Message {
  role: 'system' | 'user' | 'assistant';
  content: any;
}


const messagesImagesToList: Message[] = [
  {
    role: "system",
    content:
      "You are an AI that is going to review an image that may contain fruits, ingredients, or anything related to food." +
      " Your task is to analyze the image and deliver a list of all the ingredients present. " +
      "Also, you must validate that the image is valid and actually contains food.",
  },
  {
    role: "user",
    content: [
      {
        type: 'image_url',
        image_url: {
          url: `data:image/jpeg;base64`
        }
      }
    ]
  },
  {
    role: "assistant",
    content: "Hello world",
  },
  {
    role: "user",
    content: "How are you? {{auto}} [[Deutsch]]",
  },
  {
    role: "assistant",
    content: "Wie geht es dir?",
  },
  {
    role: "user",
    content: "Bon dia, com estas? {{auto}} [[Español]]",
  },
  {
    role: "assistant",
    content: "Buenos días, ¿cómo estás?",
  },
];
