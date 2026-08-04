import { TransactionService } from "../services/transactionSectionService.js";

export const createTransaction = async (request, reply) => {
  try {
    console.log("Incoming Request Body:", request.body);
    const transaction = await TransactionService.createTransaction(request.body);
    return reply.status(201).send({
      success: true,
      data:transaction
    });
  } catch (error) {
    return reply.status(400).send({ message: error.message });
  }
};

export const getTransactions = async(request, reply)=>{
  try{
    const transactions = await TransactionService.getTransactions();
    return reply.status(200).send({
      success:true,
      data:transactions
    })
  }
  catch(error){
    return reply.status(400).send({message: error.message})
  }
}

export const deleteTransaction = async(request, reply)=>{
  try{
    const {id} = request.params;
    const transaction = await TransactionService.deleteTransaction(id);
    if(!transaction){
      return reply.status(404).send({message: "Transaction not found"})
    }
    return reply.status(200).send({
      success:true,
      message:"Transaction deleted successfully"
    })
  }
  catch (error){
    return reply.status(400).send({message:error.message})
  }
}

export const getFinancialSummary = async(request, reply)=>{
  try{
    const {mainActivity} = request.query;
    const summary = await TransactionService.getFinancialSummary(mainActivity);
    return reply.status(200).send({
      success:true,
      data:summary
    })
  }
  catch(error){
    return reply.status(400).send({message:error.message})
  }
}


