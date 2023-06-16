/**
 * 
 * @param {Object} promptData 
 * @returns parsed response data
 */
export const updateDBJourneyWithPrompt = async (journey_id, promptData) => {
  const updateJourneyResponse = await fetch("/api/journey/updateJourney", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      journey_id,
      prompt_id: promptData.prompt_id
    })
  });

  return await updateJourneyResponse.json();

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
    body: JSON.stringify(promptData)
  });
  return await createJourneyResponse.json();
}