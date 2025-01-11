import { dataSourceOptions } from './datasource';

describe('Typeorm datasource', () => {
  it('should have correct properties', async () => {
    expect(dataSourceOptions.type).toEqual('mysql');
    expect(dataSourceOptions.synchronize).toBeTruthy();
    expect(dataSourceOptions.entities).toBeTruthy();
    expect(dataSourceOptions.factories).toBeTruthy();
  });
});
