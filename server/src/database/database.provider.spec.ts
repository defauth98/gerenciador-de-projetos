import { databaseProviders } from './database.providers';
import { dataSource } from './datasource';

jest.mock('./datasource', () => ({
  dataSource: {
    initialize: jest.fn(),
  },
}));

describe('DatabaseProviders', () => {
  it('should call initialize in useFactory method', async () => {
    await databaseProviders[0].useFactory();

    expect(dataSource.initialize).toHaveBeenCalledTimes(1);
  });
});
