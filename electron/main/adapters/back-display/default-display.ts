import { SerialPort } from 'serialport';

import { BackDisplay } from '../../core/back-display';

/** Codes for each option:
 * 49 - Price
 * 50 - Total
 * 51 - Collect
 * 52 - Change
 *
 * read /docs/LED DISPLAY And drawer.pdf for more
 *  */
const Commands = {
  clean: String.fromCharCode(12),
  price:
    String.fromCharCode(27) +
    String.fromCharCode(115) +
    String.fromCharCode(49),
  total:
    String.fromCharCode(27) +
    String.fromCharCode(115) +
    String.fromCharCode(50),
  collect:
    String.fromCharCode(27) +
    String.fromCharCode(115) +
    String.fromCharCode(51),
  change:
    String.fromCharCode(27) +
    String.fromCharCode(115) +
    String.fromCharCode(52),
  fromValue: (value: number) => {
    return (
      String.fromCharCode(27) +
      String.fromCharCode(81) +
      String.fromCharCode(65) +
      value.toString() +
      String.fromCharCode(13)
    );
  }
} as const;

export class DefaultBackDisplay implements BackDisplay {
  private serialPort: SerialPort;
  constructor(port: string) {
    this.serialPort = this.getPort(port);
  }

  private getPort(portName: string) {
    const port = new SerialPort({
      path: portName,
      baudRate: 2400,
      stopBits: 1,
      dataBits: 8
    });

    return port;
  }

  private sendCommand(command: String): Promise<void> {
    return new Promise((resolve, reject) => {
      this.serialPort.write(command, (err) => {
        if (err) {
          reject(`Error writing to serial port: ${err}`);
          return;
        }

        resolve();
      });
    });
  }

  async clean(): Promise<void> {
    return this.sendCommand(Commands.clean);
  }

  async showChange(value: number): Promise<void> {
    await this.sendCommand(Commands.change);
    return this.sendCommand(Commands.fromValue(value));
  }

  async showCollect(value: number): Promise<void> {
    await this.sendCommand(Commands.collect);
    return this.sendCommand(Commands.fromValue(value));
  }

  async showPrice(value: number): Promise<void> {
    await this.sendCommand(Commands.price);
    return this.sendCommand(Commands.fromValue(value));
  }

  async showTotal(value: number): Promise<void> {
    await this.sendCommand(Commands.total);
    return this.sendCommand(Commands.fromValue(value));
  }
}
