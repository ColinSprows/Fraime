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
 * 
 * 
 *
 */
export const loadStorePrompt = () => {
  return JSON.parse(localStorage.getItem('fraime-current-prompt-data'));
}

/**
 * createStoreJourney dynamically handles for updating promptData and/or imageId
 * 
 * @param {Object} promptData the current prompt data
 */
export const createStoreJourney = async ({ journey }) => {

    localStorage.setItem('fraime-current-journey-data', JSON.stringify(journey));

}

/**
 * 
 */
export const loadStoreJourney = () => {
  return JSON.parse(localStorage.getItem('fraime-current-journey-data'));
}

/**
 * updateStoreJourney dynamically handles for updating promptData and/or imageId
 * 
 * @param {Object} promptData the current prompt data
 */
export const updateStoreJourney = async (journey) => {
 
  localStorage.setItem('fraime-current-journey-data', JSON.stringify(journey));
}

/**
 * 
 */
export const createStoreImage = (url, image_id) => {
  localStorage.setItem('fraime-current-image-data', JSON.stringify({
    url,
    image_id
  }));
}