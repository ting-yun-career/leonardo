const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        host: `http://localhost:3000`,
      },
    };
  }

  return {
    env: {
      host: `https://leonardo-pi.vercel.app`,
    },
  };
};
