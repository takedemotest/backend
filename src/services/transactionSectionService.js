import TransactionModel from "../models/Transaction.model.js";

const expenseValues = [
  "Seeds",
  "Feed",
  "Fertilizer",
  "Pesticides",
  "Healthcare",
  "Labor",
  "Transport",
  "Other",
];
const revenueValues = ["Sales", "Other"];

export class TransactionService {
  
  static async validateTransactionData(data) {
    const { type, category, amount } = data;

    if (type === "EXPENSE" && !expenseValues.includes(category)) {
      throw new Error(
        `Invalid category for EXPENSE. Allowed values are: ${expenseValues.join(", ")}`,
      );
    }
    if (type === "REVENUE" && !revenueValues.includes(category)) {
      throw new Error(
        `Invalid category for REVENUE. Allowed values are: ${revenueValues.join(", ")}`,
      );
    }

    if (amount < 0) {
      throw new Error("Amount must be a non-negative number");
    }
  }

  static async createTransaction(data) {
    await this.validateTransactionData(data);
    return await TransactionModel.create(data);
  }

  static async getTransactions() {
    return await TransactionModel.find().sort({ createAt: -1 });
  }

  static async deleteTransaction(id) {
    const deleteItem = await TransactionModel.findByIdAndDelete(id);
    if (!deleteItem) {
      throw new Error("Transaction not found");
    }
    return deleteItem;
  }

  static async getFinancialSummary(mainActivity) {
    const filter = mainActivity ? { mainActivity } : {};
    const transactions = await TransactionModel.find(filter);

    let totalExpense = 0;
    let totalRevenue = 0;

    transactions.forEach((t) => {
      if (t.type === "EXPENSE") {
        totalExpense += t.amount;
      } else if (t.type === "REVENUE") {
        totalRevenue += t.amount;
      }
    });

    let netProfit = totalRevenue - totalExpense;
    let profitMargin =
      totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(2) : 0;

    return {
      totalTransactions: transactions.length,
      profitMarginPercentage: `${profitMargin}%`,
      totalExpense,
      totalRevenue,
      netProfit,
      profitMargin,
    };
  }
}
