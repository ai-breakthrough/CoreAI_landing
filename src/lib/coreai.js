export function getApiBase() {
  const port = import.meta.env.VITE_API_PORT || '8000';
  const proto = location.protocol;
  const host = import.meta.env.VITE_API_HOST || location.hostname;
  return `${proto}//${host}:${port}`;
}

export function getQuestionUrl() {
  return `${getApiBase()}/question`;
}

export async function askCoreAI(query, userId) {
  const res = await fetch(getQuestionUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ user_id: userId, query }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  try {
    const data = await res.json();
    return (
      data?.updates?.reply ??
      data?.answer ??
      data?.response ??
      data?.message ??
      ''
    );
  } catch {
    return await res.text();
  }
}
