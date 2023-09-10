import fs from 'fs';

import { CashDrawer } from '../../core/cash-drawer';

export class DefaultCashDrawer implements CashDrawer {
  open(): Promise<void> {
    const prnPort = '\\\\.\\LPT1'; // This is the full path for direct hardware access in Windows
    const dataBuffer = Buffer.from([27, 'p'.charCodeAt(0), 0, 128, 128]);

    return new Promise((resolve, reject) => {
      fs.open(prnPort, 'w', (err, fd) => {
        if (err) {
          reject(`Error opening port: ${err.message}`);
          return;
        }

        fs.write(fd, dataBuffer, 0, dataBuffer.length, null, (writeErr) => {
          if (writeErr) {
            reject(`Error writing to port: ${writeErr.message}`);
            return;
          }

          fs.close(fd, (closeErr) => {
            if (closeErr) {
              reject(`Error closing port: ${closeErr.message}`);
            }

            resolve();
          });
        });
      });
    });
  }
}
