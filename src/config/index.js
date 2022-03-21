const env = process.env.NODE_ENV || "development";

let cache;

const config = () => {
  if (!cache) {
    cache = Object.freeze({
      env,
      secrets: {
        apiHost: "https://paymentstaging.airgate.ng",
      },
    });
  }
  return cache;
};

export default config;
