/**
 * 
 * @param {Object} promptData 
 * @returns parsed response from api
 */
export const createDBPrompt = async(promptInfo) => {
  const createPromptResponse = await fetch("/api/prompt/createPrompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promptInfo.prompt),
  });

  return await createPromptResponse.json();
}

/**
 * 
 * @param {Object} promptData 
 * @returns parsed response from api
 */
export const createDBJourney = async (promptData) => {
  const createJourneyResponse = await fetch("/api/journey/createJourney", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt_id: promptData.prompt_id
    })
  });
  return await createJourneyResponse.json();
}

/**
 * 
 * @param {Object} promptData 
 * @returns parsed response data
 */
export const updateDBJourney = async (journey_id, { promptData, imageId }) => {

  const updateJourneyResponse = await fetch("/api/journey/updateJourney", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      journey_id,
      prompt_id: promptData?.prompt_id,
      image_id: imageId
    })
  });

  return await updateJourneyResponse.json();

}
