import { app, ipcMain } from 'electron';

import { BackDisplay } from '../../core/back-display';
import { ElectronPort } from '../../ports/electron';

/**
 * Listens to:
 * - `pos:back-display:show-price`
 * - `pos:back-display:show-total`
 * - `pos:back-display:show-collect`
 * - `pos:back-display:show-change`
 */
export class ElectronBackDisplayAdapter implements ElectronPort {
  constructor(private backDisplay: BackDisplay) {
    this.setupListeners();
  }

  setupListeners(): void {
    ipcMain.on('pos:back-display:clean', async () => {
      await this.backDisplay.clean();
    });
    ipcMain.on('pos:back-display:show-price', async (_, price: number) => {
      await this.backDisplay.showPrice(price);
    });
    ipcMain.on('pos:back-display:show-total', async (_, total: number) => {
      await this.backDisplay.showTotal(total);
    });
    ipcMain.on('pos:back-display:show-collect', async (_, collect: number) => {
      await this.backDisplay.showCollect(collect);
    });
    ipcMain.on('pos:back-display:show-change', async (_, change: number) => {
      await this.backDisplay.showChange(change);
    });
    app.on('will-quit', async () => {
      await this.backDisplay.clean();
    });
  }
}
