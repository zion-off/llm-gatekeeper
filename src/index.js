import { pipeline } from "@xenova/transformers";

class ClassificationPipeline {
  static async getInstance(progress_callback = null) {
    if (!this.instance) {
      this.instance = await pipeline(
        "zero-shot-classification",
        "Xenova/roberta-large-mnli",
        { progress_callback }
      );
    }
    return this.instance;
  }
}

ClassificationPipeline.instance = null;

async function isRelevant(prompt, keywords) {
  const classifier = await ClassificationPipeline.getInstance();
  let sequence_to_classify = prompt;
  let candidate_labels = [`${keywords.join(", or ")}.`, `something else`];
  let result = await classifier(sequence_to_classify, candidate_labels);
  let irrelevantIndex = result.labels.indexOf("something else");
  let relevantIndex = irrelevantIndex === 0 ? 1 : 0;

  // Compare the scores based on the indices
  if (result.scores[relevantIndex] > result.scores[irrelevantIndex]) {
    return true;
  } else {
    return false;
  }
}

export default isRelevant;
