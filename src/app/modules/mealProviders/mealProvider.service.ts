import { TMealProvider } from "./mealProvider.interface";
import { MealProvider } from "./mealProvider.model";


const createMealProviderInDB = async (payload: TMealProvider) => {
  return await MealProvider.create(payload);
};

const findAllMealProvidersInDB = async () => {
  return await MealProvider.find();
};

const updateMealProviderInDB = async (
  id: string,
  payload: Partial<TMealProvider>,
) => {
  return await MealProvider.findByIdAndUpdate(id, payload, { new: true });
};
const respondToCustomerOrder = async (
  orderId: string,
  status: 'pending' | 'in_progress' | 'delivered',
) => {
  return await MealProvider.findByIdAndUpdate(orderId, { status }, { new: true });
};

export const mealProviderServices = {
  createMealProviderInDB,
  findAllMealProvidersInDB,
  updateMealProviderInDB,
  respondToCustomerOrder,
};
