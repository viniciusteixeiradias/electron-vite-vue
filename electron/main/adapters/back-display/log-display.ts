import { BackDisplay } from '../../core/back-display';

export class LogBackDisplay implements BackDisplay {
  constructor() {}

  async clean(): Promise<void> {
    console.info('Clean');
  }

  async showChange(value: number): Promise<void> {
    console.info(`Change: ${value}`);
  }

  async showCollect(value: number): Promise<void> {
    console.info(`Collect: ${value}`);
  }

  async showPrice(value: number): Promise<void> {
    console.info(`Price: ${value}`);
  }

  async showTotal(value: number): Promise<void> {
    console.info(`Total: ${value}`);
  }
}
