import { pipeline, env } from "@xenova/transformers";

// Disable local models
env.allowLocalModels = false;
env.useBrowserCache = false;

const MODEL = "Xenova/roberta-large-mnli";
const TASK = "zero-shot-classification";

// Start loading the model immediately
console.log("llm-prompt-relevance-check: starting to load the model...");
const pipelinePromise = pipeline(TASK, MODEL).then((pipe) => {
  console.log("llm-prompt-relevance-check: model loaded successfully");
  return pipe;
});

// Singleton class for the zero-shot classification pipeline
class ClassificationPipeline {
  static instance: any = null;

  static async getInstance(
    progress_callback: Function | undefined = undefined
  ) {
    if (this.instance === null) {
      this.instance = await pipelinePromise;
    }
    return this.instance;
  }
}

// Function to check relevance
export default async function isRelevant(
  prompt: string,
  keywords: string[]
): Promise<boolean> {
  const classifier = await ClassificationPipeline.getInstance();
  const sequence_to_classify = prompt;
  const candidate_labels = [`${keywords.join(", or ")}.`, `something else`];
  const result = await classifier(sequence_to_classify, candidate_labels);

  const irrelevantIndex = result.labels.indexOf("something else");
  const relevantIndex = irrelevantIndex === 0 ? 1 : 0;

  // Compare the scores based on the indices
  return result.scores[relevantIndex] > result.scores[irrelevantIndex];
}
