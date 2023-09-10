import { ipcMain } from 'electron';

import { CashDrawer } from '../../core/cash-drawer';
import { ElectronPort } from '../../ports/electron';

/**
 * Listens to:
 * - `pos:cash-drawer:open`
 */
export class ElectronCashDrawerAdapter implements ElectronPort {
  constructor(private cashDrawer: CashDrawer) {
    this.setupListeners();
  }

  setupListeners(): void {
    ipcMain.on('pos:cash-drawer:open', async () => {
      await this.cashDrawer.open();
    });
  }
}
