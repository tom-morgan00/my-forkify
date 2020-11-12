//This file is used for storing helper methods that can be used multiple times in the application
//HELPER FUNCTIONS

import { TIMEOUT_SECS } from './config.js';

// this timeout will reject a promise after a certain amount of time
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECS)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);
    return data;
  } catch (err) {
    throw err;
  }
};

/*

//helper function to make API requests
export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECS)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);
    return data;
  } catch (err) {
    throw err;
  }
};

helper function to send data tp API
export const sendJSON = async function (url, uploadData) {
  try {
    const sendPromise = 
    const response = await Promise.race([sendPromise, timeout(TIMEOUT_SECS)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);
    return data;
  } catch (err) {
    throw err;
  }
};*/
