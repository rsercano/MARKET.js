export const OrderSchema = {
  id: '/Order',
  properties: {
    contractAddress: { $ref: '/Address' },
    expirationTimestamp: { $ref: '/Number' },
    feeRecipient: { $ref: '/Address' },
    maker: { $ref: '/Address' },
    makerFee: { $ref: '/Number' },
    orderQty: { $ref: '/Number' },
    price: { $ref: '/Number' },
    remainingQty: { $ref: '/Number' },
    salt: { $ref: '/Number' },
    taker: { $ref: '/Address' },
    takerFee: { $ref: '/Number' }
  },
  required: [
    'contractAddress',
    'expirationTimestamp',
    'feeRecipient',
    'maker',
    'makerFee',
    'orderQty',
    'price',
    'remainingQty',
    'salt',
    'taker',
    'takerFee'
  ],
  type: 'object'
};

export const SignedOrderSchema = {
  id: '/SignedOrder',
  allOf: [
    { $ref: '/Order' },
    {
      properties: {
        ecSignature: { $ref: '/ECSignature' }
      },
      required: ['ecSignature']
    }
  ]
};
