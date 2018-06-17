import Web3 from 'web3';

import { ECSignature } from '../types/Order';

export const Utils = {
  /**
   * Signs a message.
   *
   * @param web3
   * @param address
   * @param message
   * @return {[*,*,*]}
   */
  signMessage(web3: Web3, address: string, message: string): Promise<ECSignature> {
    return new Promise<ECSignature>((resolve, reject) => {
      web3.eth.sign(address, message, (err, signature) => {
        // Log errors, if any
        // TODO: Handle error
        if (err) {
          console.error(err);
        }

        const r = signature.slice(0, 66);
        const s = `0x${signature.slice(66, 130)}`;
        let v = web3.toDecimal(`0x${signature.slice(130, 132)}`);

        if (v !== 27 && v !== 28) {
          v += 27;
        }

        resolve({ v, r, s });
      });
    });
  }
};
