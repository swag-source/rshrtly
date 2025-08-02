export async function isValidCustomUrl(custom_url: string) {
  const customUrlRegex: RegExp = /^[a-zA-Z0-9_-]{3,50}$/;
  const reservedWords = [
    "api",
    "admin",
    "www",
    "app",
    "dashboard",
    "analytics",
  ];

  return (
    customUrlRegex.test(custom_url) &&
    !reservedWords.includes(custom_url.toLowerCase())
  );
}
