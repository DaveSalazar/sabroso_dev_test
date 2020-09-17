import { Request, Response } from "express";
import logger from "../libs/logger";
import Order, { IOrder } from "../models/Order";
const MUUID = require('uuid-mongodb');
const mUUID = MUUID.mode('relaxed');

export const getByUser = async (request: Request, response: Response) => {
  try {
    const userId = request.params.userId;
    const orders: IOrder[] = await Order.where('userId').equals(userId).then( res => {
      return res.map((el: any) => {
        return {
          userId: el.userId,
          details: el.details,
          subtotal: el.subtotal,
          total: el.total,
          id: mUUID.from(el._id)
        }
      });
    });
    return response.status(200).json(orders);
  } catch (error) {
    logger.error(error.stack);
    return response.status(500).json({ message: "Error en el servidor" });
  }
};

export const createOrder = async (request: Request, response: Response) => {
    try {
      const orderId = request.params.orderId;     
      const { userId, details, subtotal, total } = request.body;
      const order = new Order({_id: mUUID.from(orderId), userId, details, subtotal, total })
      order.save()
      return response.status(201).json({ order, message: 'ok '});
    } catch (error) {
      logger.error(error.stack);
      return response.status(500).json({ message: "Error en el servidor" });
    }
  };
