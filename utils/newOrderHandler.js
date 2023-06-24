import { createDBOrder, updateDBJourney } from '@/utils/databaseHandler';
import { createStoreOrder, loadStoreJourney, updateStoreJourney } from '@/utils/storageHandler';

export const newOrderHandler = async (orderObj, journeyObj) => {
  
  const createDBOrderData =  await createDBOrder(orderObj);

  createStoreOrder(createDBOrderData);

  console.log("journeyObj", journeyObj);
  const updateJourneyData = await updateDBJourney(
    { 
      journey_id: journeyObj.journey_id, order_id: createDBOrderData.order._id, ordered_image_id: journeyObj.ordered_image_id 
    }
  );

  updateStoreJourney(updateJourneyData);
  
  return createDBOrderData;

}