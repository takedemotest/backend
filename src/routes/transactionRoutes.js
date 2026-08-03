import { createTransaction } from '../controllers/transactionController.js';

async function transactionRoutes(fastify, options) {
  fastify.post('/', {
    schema: {
      description: 'Create a new farm expense or revenue record',
      tags: ['Transactions'],
      body: {
        type: 'object',
        required: ['type', 'mainActivity', 'title', 'amount', 'category'],
        properties: {
          type: { type: 'string', enum: ['EXPENSE', 'REVENUE'] },
          mainActivity: {
            type: 'string',
            enum: ['CROP_FARMING', 'DAIRY_FARMING', 'GOAT_FARMING', 'POULTRY_FARMING', 'PIGGERY']
          },
          subActivity: { type: 'string' },
          title: { type: 'string' },
          amount: { type: 'number', minimum: 0 },
          category: {
            type: 'string',
            enum: ['Seeds', 'Feed', 'Fertilizer', 'Pesticides', 'Healthcare', 'Labor', 'Transport', 'Sales', 'Other']
          },
          description: { type: 'string' },
          date: { type: 'string', format: 'date-time' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { type: 'object' }
          }
        }
      }
    }
  }, createTransaction);
}

export default transactionRoutes;