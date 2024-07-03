declare module "llm-prompt-relevance-check" {
    export function isRelevant(prompt: string, keywords: string[]): Promise<string>;
  
    class ClassificationPipeline {
      static instance: any;
      static getInstance(progress_callback?: any): Promise<any>;
    }
  }
  