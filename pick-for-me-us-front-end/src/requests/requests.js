const axios = require('axios');

const urlEndpointOne = '/fiveLatestChoicesMade';
const urlEndpointTwo = '/saveChoiceMade';

const getFiveLatestChoicesMade = () => {
  const promise = axios.get(urlEndpointOne);
  const promiseResponse = promise.then((response) => {
    console.log("'getFiveLatestChoicesMade': This is what came out of our 'GET' request", response);
    console.log("'getFiveLatestChoicesMade': This is what will be returned", response.data);

    return response.data;
  }).catch((error) => {
    console.log('An error occurred', error);

    return [];
  });

  return promiseResponse;
};

const addChoicePicked = (choicePickedObject) => {
  const promise = axios.post(urlEndpointTwo, choicePickedObject);
  const promiseResponse = promise.then((response) => {
    console.log("'addChoicePicked': This is what came out of our 'POST' request", response);
    console.log("'addChoicePicked': This is what will be returned", response.data);

    return response.data;
  }).catch((error) => {
    console.log('An error occurred', error);

    return [];
  });

  return promiseResponse;
};

// -----

const allRequests = {
  getFiveLatestChoicesMade: getFiveLatestChoicesMade,
  addChoicePicked: addChoicePicked
};

export default allRequests;