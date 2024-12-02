import { AppController } from './app.controller';

jest.useFakeTimers();

describe('AppController', () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController();
  });

  describe('getTime()', () => {
    it('should return current server time', async () => {
      expect(await appController.getTime()).toEqual(new Date().toISOString());
    });
  });
});
