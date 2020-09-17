import { Request, Response } from "express";
import logger from "../libs/logger";
import Product, { IProduct } from "../models/Product";
const MUUID = require('uuid-mongodb');
const mUUID = MUUID.mode('relaxed');

export const getAll = async (request: Request, response: Response) => {
  try {
    const products = await Product.find().then( res => {
      return res.map((el: any) => {
        return {
          name: el.name,
          description: el.description,
          price: el.price,
          id: mUUID.from(el._id)
        }
      });
    })
    return response.status(200).json(products);
  } catch (error) {
    logger.error(error.stack);
    return response.status(500).json({ message: "Error en el servidor" });
  }
};

export const getById = async (request: Request, response: Response) => {
  try {
    const productId = request.params.productId;
    const product = await Product.findById(mUUID.from(productId)).then( (res: any) => {
      return {
        name: res.name,
        description: res.description,
        price: res.price,
        id: mUUID.from(res._id)
      }
    });
    
    if(!product)
      return response.status(404).json(product);
    
    return response.status(200).json(product);
  } catch (error) {
    logger.error(error.stack);
    return response.status(500).json({ message: "Error en el servidor" });
  }
};

export const createProduct = async (request: Request, response: Response) => {
  try {
    const productId = request.params.productId;
    const { name, description, price } = request.body;
    let product = new Product({_id: mUUID.from(productId), name, description, price})
    product.save().then((res: any) => {
      return  {
        name: res.name,
        description: res.description,
        price: res.price,
        id: mUUID.from(res._id)
      }
    });
    return response.status(201).json({ product, message: 'ok '});
  } catch (error) {
    logger.error(error.stack);
    return response.status(500).json({ message: "Error en el servidor" });
  }
};

