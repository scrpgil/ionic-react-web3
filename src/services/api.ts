// docs: https://etherscan.io/apis#contracts

// const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;

const get = async (url: any) => {
  try {
    console.log(url);
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log("error getting contract ABI", e);
    return null;
  }
};

const API = {
  get,
};

export default API;
