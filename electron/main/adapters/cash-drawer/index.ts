import { DefaultCashDrawer } from './default-drawer';
import { LogCashDrawer } from './log-drawer';

type CashDrawerType = 'log' | 'default';

export function cashDrawerFactory(type: CashDrawerType) {
  if (type == 'log') {
    return new LogCashDrawer();
  } else if (type == 'default') {
    return new DefaultCashDrawer();
  }

  return new LogCashDrawer();
}
