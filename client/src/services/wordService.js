import callWebApi from '../helpers/webApiHelper';

export const getCurrentWord = async () => {
  const response = await callWebApi({
    endpoint: '/word',
    type: 'GET'
  });
  return response.json();
};
