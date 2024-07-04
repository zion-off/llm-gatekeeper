# llm-prompt-relevance-check

A lightweight package to help you check whether a prompt to an AI chatbot is relevant to the context. Keep your API costs down by filtering out irrelevant queries!

## Overview

This package uses the [Xenova/mobilebert-uncased-mnli](https://huggingface.co/Xenova/mobilebert-uncased-mnli) model via the Transformers.js library to perform zero-shot classification.

## Features

- Fast and efficient relevance checking (model automatically loads in a few seconds)
- Uses advanced NLP model for accurate classification
- Easy to integrate into existing chatbot systems
- Helps reduce unnecessary API calls to your main LLM

## Installation

```sh
$ npm i llm-prompt-relevance-check
```

## Usage

```js
import isRelevant from "llm-prompt-relevance-check";

const prompt = "Should I travel this summer?";
const keywords = ["reading", "books", "essays"];

const relevance = await isRelevant(prompt, keywordArray);

if (relevance === false) {
  // do not make API call
  console.log(
    `Sorry, the chatbot can only answer questions about ${keywords.join(
      ", or "
    )}`
  );
} else {
  // make API call
}
```

## API

### isRelevant(prompt, keywords)

| Parameter | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| prompt    | string    | The input text to check for relevance              |
| keywords  | string [] | An array of keywords defining the relevant context |

Returns

`Promise<boolean>:` Resolves to `true` if the prompt is relevant, `false` otherwise.

## How It Works

The package uses a pre-trained [MobileBERT](https://huggingface.co/typeform/mobilebert-uncased-mnli#model-card-for-mobilebert-a-compact-task-agnostic-bert-for-resource-limited-devices) model for zero-shot classification. The model is lightweight, and optimized for resource-limited devices.

It classifies the prompt into two categories: one containing your keywords, and "something else".
If the prompt is more likely to belong to the keyword category, it's considered relevant.

## Performance Considerations

- The model is loaded asynchronously when the package is imported, which may cause a short delay on first use. The model is usually loaded within the first few seconds of page load.
- Once the model is in memory, promises are resolved almost instantaneously.

## Limitations

If you are not getting accurate results, try adding more keywords. Or submit an issue on GitHub!

## Credits

Thanks to my friend [Zein](https://github.com/ZeinMukhanov) for inspiring the idea for the package. I wouldn't have made it if he wasn't abusing my chatbot on my web and costing me money.