import { createDBImage, updateDBJourney } from '@/utils/databaseHandler';
import { createStoreImage, updateStoreJourney } from '@/utils/storageHandler';

export const newImageHandler = async (url, prompt_id, journey_id) => {
  const data = await createDBImage(url, prompt_id);

  createStoreImage(url, data.image._id);

  const newJourney = updateDBJourney({
    journey_id,
    prompt_id,
    image_id: data.image_id
  });

  updateStoreJourney(newJourney);
}