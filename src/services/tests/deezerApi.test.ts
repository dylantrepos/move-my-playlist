import axios from 'axios';
import { DeezerAccessTokenResponse } from '../../types/deezer/DeezerLogin';

// Mock axios to prevent actual HTTP requests during tests
jest.mock('axios');

describe('fetchDeezerToken', () => {
  it('fetches Deezer token successfully', async () => {
    // Set up mock response
    const mockDeezerAccessTokenResponse: DeezerAccessTokenResponse = {
      'access_token': '',
      'expires': 0
    };
    const mockAxiosGet = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockDeezerAccessTokenResponse });

    // Mock import.meta.env
    const originalImportMeta = Object.assign({}, import.meta);
    jest.spyOn(global, 'import').mockImplementation(() => ({
      meta: {
        env: {
          VITE_DEEZER_APP_ID: 'your-app-id',
          VITE_DEEZER_SECRET_KEY: 'your-secret-key',
        },
      },
    }));

    // Call the function
    const code = 'your-code';
    const result = await fetchDeezerToken(code);

    // Assertions
    expect(mockAxiosGet).toHaveBeenCalledWith('/deezer-token', {
      params: {
        app_id: 'your-app-id',
        secret: 'your-secret-key',
        output: 'json',
        code,
      },
    });
    expect(result).toEqual(mockDeezerAccessTokenResponse);

    // Restore import.meta.env and axios.get
    Object.assign(import.meta, originalImportMeta);
    mockAxiosGet.mockRestore();
  });
});
