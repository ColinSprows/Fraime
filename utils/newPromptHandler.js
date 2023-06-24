import { createStorePrompt, createStoreJourney } from '@/utils/storageHandler';

import { createDBPrompt, createDBJourney } from '@/utils/databaseHandler';

export const newPromptHandler = async (promptInfo) => {

  // create new DB-Prompt
  const createPromptResponseData = await createDBPrompt(promptInfo);

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