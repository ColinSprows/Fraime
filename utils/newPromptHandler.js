import { createStorePrompt, createStoreJourney } from '@/utils/storageHandler';

import { createDBJourney } from '@/utils/databaseHandler';

export const newPromptHandler = async (promptInfo) => {

  // create new DB-Prompt
  const createPromptResponse = await fetch("/api/prompt/createPrompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promptInfo.prompt),
  });

  const createPromptResponseData = await createPromptResponse.json();

  const promptData = {
    ...promptInfo,
    prompt_id: createPromptResponseData.prompt._id
  }

  // create new Store-Prompt
  createStorePrompt(promptData);

  // create new DB-Journey
  const newJourney = await createDBJourney(promptData);

  // create new Store-Journey
  createStoreJourney(newJourney);
  
}