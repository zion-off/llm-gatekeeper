import isRelevant from '../src/index.js';

async function runTest() {
  const prompt = "i like travelling.";
  const keywords = ["books", "reading recommendations"]
  
  try {
    const result = await isRelevant(prompt, keywords);
    console.log("Test result:", result);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

runTest();
