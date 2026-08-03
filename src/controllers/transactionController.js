import TransactionModel from '../models/Transaction.model.js';

export const createTransaction = async(request, reply)=> {
  try {
    const transaction = new TransactionModel(request.body);
    await transaction.save();
    reply.status(201).json(transaction);}
  catch (error) {
    reply.status(400).json({ message: error.message });
  }
}