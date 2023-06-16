import { updateDBJourneyWithPrompt, createDBJourney } from '@/utils/databaseHandler';

/**
 * 
 * @param {Object} promptData the current prompt data
 *
 */
export const savePromptDataToStorage = (promptData) => {
  localStorage.setItem('fraime-current-prompt-data', JSON.stringify(promptData));
}

/**
 * 
 * @param {Object} promptData the current prompt data
 */
export const updateStoreJourneyWithPrompt = async (promptData) => {
  // check if there is a current journey
  const currentJourneyJSON = localStorage.getItem('fraime-current-journey-data');
    
  // if there is:
  if (currentJourneyJSON) {
    const currentJourneyData = JSON.parse(currentJourneyJSON);
    // 1. update journey in database
    const updateJourneyResponseData = await updateDBJourneyWithPrompt(currentJourneyData._id, promptData);

    // 2. update journey in local storage
    currentJourneyData.journey.prompt_ids.push(promptData.prompt_id);
    localStorage.setItem('fraime-current-journey-data', currentJourneyData);
  } else {
    // else

    // 1. create journey API request
    const journeyData = await createDBJourney(promptData);
    
    // 2. set journey in local storage
    localStorage.setItem('fraime-current-journey-data', JSON.stringify(journeyData));

  }
}