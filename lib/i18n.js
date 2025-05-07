// lib/i18n.js
export function getLocaleFromRequest(request) {
  const url = new URL(request.url);
  const pathLocale = url.pathname.split("/")[1]; // Extract locale from the URL path
  const supportedLocales = ["en", "vi"]; // Supported locales
  return supportedLocales.includes(pathLocale) ? pathLocale : "vi";
}
