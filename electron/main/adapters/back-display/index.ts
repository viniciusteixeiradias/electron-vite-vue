import { DefaultBackDisplay } from './default-display';
import { LogBackDisplay } from './log-display';

type DisplayType = 'log' | 'default';

export function displayFactory(type: DisplayType) {
  if (type == 'log') {
    return new LogBackDisplay();
  } else if (type == 'default') {
    return new DefaultBackDisplay('COM2');
  }

  return new LogBackDisplay();
}
