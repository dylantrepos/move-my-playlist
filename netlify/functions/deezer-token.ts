import axios from 'axios';
import qs from 'querystring';

export const handler = async (event: { body: string }) => {
  const params = qs.parse(event.body);

  try {
    const response = await axios.get('https://connect.deezer.com/oauth/access_token.php', {
      params: {
        app_id: params.app_id,
        secret: params.secret,
        output: 'json',
        code: params.code,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};