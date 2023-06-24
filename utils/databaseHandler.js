/**
 * 
 * @param {Object} promptData 
 * @returns parsed response from api
 */
export const createDBPrompt = async (promptInfo) => {
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
export const updateDBJourney = async ({ journey_id, prompt_id, image_id, order_id, ordered_image_id }) => {

  const updateJourneyResponse = await fetch("/api/journey/updateJourney", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      journey_id,
      prompt_id,
      image_id,
      order_id,
      ordered_image_id
    })
  });

  return await updateJourneyResponse.json();

}

/**
 * 
 */
export const createDBImage = async (url, prompt_id) => {
  const response = await fetch("/api/image/saveImage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, prompt_id }),
  });
  return await response.json();
}

/**
 * 
 */
export const createDBOrder = async (orderObj) => {
  const response = await fetch("/api/order/createOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderObj),
  });
  return await response.json();
}