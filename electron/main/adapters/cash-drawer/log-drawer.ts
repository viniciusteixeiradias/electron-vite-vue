import { CashDrawer } from '../../core/cash-drawer';

export class LogCashDrawer implements CashDrawer {
  async open(): Promise<void> {
    console.info('Cash drawer: open');
  }
}
