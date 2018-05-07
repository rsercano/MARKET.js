import { BigNumber } from 'bignumber.js';

export enum SolidityTypes {
    Address = 'address',
    Uint256 = 'uint256',
    Uint8 = 'uint8',
    Uint = 'uint',
}

export interface Order {
    maker: string;
    taker: string;
    makerFee: BigNumber;
    takerFee: BigNumber;
    price: BigNumber;
    qty: BigNumber;
    makerTokenAddress: string;
    takerTokenAddress: string;
    salt: BigNumber;
    marketContractAddress: string;
    feeRecipient: string;
    expirationTimeStamp: BigNumber;
}

export interface SignedOrder extends Order {
    ecSignature: ECSignature;
}

/**
 * Elliptic Curve signature for orders.
 */
export interface ECSignature {
    v: number;
    r: string;
    s: string;
}
