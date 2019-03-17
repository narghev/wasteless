const SERVICE_URL = "https://a9d90775.ngrok.io";

const getBins = () => {
  return fetch(`${SERVICE_URL}/bins`).then(res => res.json());
};

const registerPullService = (callback, interval = 1000) => {
  const pullInterval = setInterval(() => {
    getBins()
      .then(callback)
      .catch(() => {});
  }, interval);
  return () => {
    clearInterval(pullInterval);
  };
};

export default registerPullService;
