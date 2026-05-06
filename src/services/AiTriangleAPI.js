const BASE_URL = "http://127.0.0.1:8000";

async function handleResponse(res) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    let message = `Request failed (${res.status})`;

    // FastAPI 422 returns detail as ARRAY — this caused [object Object]
    if (Array.isArray(err.detail)) {
      message = err.detail
        .map((e) => {
          const field = e.loc ? e.loc.slice(1).join(".") : "field";
          return `${field}: ${e.msg}`;
        })
        .join("; ");
    } else if (typeof err.detail === "string") {
      message = err.detail;
    }

    throw new Error(message);
  }
  return res.json();
}

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    return handleResponse(res);
  } catch (err) {
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error("Backend not reachable. Is the server running?");
    }
    throw err;
  }
}

const AiTriangleAPI = {
  checkHealth: () => safeFetch(`${BASE_URL}/health`),

  uploadBook: (file) => {
    const form = new FormData();
    form.append("file", file);
    return safeFetch(`${BASE_URL}/v1/ingest/upload`, {
      method: "POST",
      body: form,
    });
  },

  query: (question, top_k = 5, min_score = 0.25) =>
    safeFetch(`${BASE_URL}/v1/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, top_k, min_score }),
    }),

  listBooks: () => safeFetch(`${BASE_URL}/v1/books`),

  deleteBook: (bookId) =>
    safeFetch(`${BASE_URL}/v1/books/${bookId}`, {
      method: "DELETE",
    }),
};

export default AiTriangleAPI;