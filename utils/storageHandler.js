import { updateDBJourney, createDBJourney } from '@/utils/databaseHandler';

/**
 * 
 * @param {Object} promptData the current prompt data
 *
 */
export const createStorePrompt = (promptData) => {
  localStorage.setItem('fraime-current-prompt-data', JSON.stringify(promptData));
}

/**
 * createStoreJourney dynamically handles for updating promptData and/or imageId
 * 
 * @param {Object} promptData the current prompt data
 */
export const createStoreJourney = async (journey) => {

    localStorage.setItem('fraime-current-journey-data', JSON.stringify(journey));

}
/**
 * updateStoreJourney dynamically handles for updating promptData and/or imageId
 * 
 * @param {Object} promptData the current prompt data
 */
export const updateStoreJourney = async ({ promptData, imageId }) => {
  // check if there is a current journey
  const currentJourneyJSON = localStorage.getItem('fraime-current-journey-data');
    
  // if there is:
  if (currentJourneyJSON) {
    const currentJourneyData = JSON.parse(currentJourneyJSON);
    // 1. update journey in database
    const updateJourneyResponseData = await updateDBJourney(currentJourneyData._id, { promptData, imageId });

    // 2. update journey in local storage
    localStorage.setItem('fraime-current-journey-data', JSON.stringify(updateJourneyResponseData));
  } else {
    // else
    // 1. create journey API request
    const { journey } = await createDBJourney({ promptData, imageId });
    
    // 2. set journey in local storage
    localStorage.setItem('fraime-current-journey-data', JSON.stringify(journey));

  }
}