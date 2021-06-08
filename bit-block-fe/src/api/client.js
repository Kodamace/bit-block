export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    if (response.status === 204) {
      return {};
    }
    data = await response.json();

    if (response.ok) {
      return data;
    }

    throw new Error(response.statusText);
  } catch (err) {
    if (err.name === "SyntaxError") {
      return Promise.reject("");
    }
    return Promise.reject(data ? data : err.message);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
};
