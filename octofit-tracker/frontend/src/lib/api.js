export function getCodespaceName() {
  return import.meta.env.VITE_CODESPACE_NAME?.trim();
}

export function getApiBaseUrl() {
  const codespaceName = getCodespaceName();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export function buildApiUrl(path) {
  return `${getApiBaseUrl()}${path}`;
}
