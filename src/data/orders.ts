import { Order } from "../types";
import AxiosInstance from "../lib/AxiosInstence";

async function getOrders(id: string) {
  try {
    const response = await AxiosInstance.get(`/order/${id}`);
    return response.data.$values.map((order : Order) => ({
      orderId: order.orderId,
      id: order.id,
      date: order.date,
      total: order.total,
      status: order.status,
      trackingNumber: order.trackingNumber,
      estimatedDelivery: order.estimatedDelivery,
      items: order.items.$values.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    }));
  } catch (e) {
    console.log(e);
    return [];
  }
}


export { getOrders };
