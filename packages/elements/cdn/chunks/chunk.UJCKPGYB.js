// src/utilities/date.ts
var language = new Intl.DateTimeFormat().resolvedOptions().locale;
function getDate(lang = language) {
  const date = /* @__PURE__ */ new Date();
  return date.toLocaleDateString(lang, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function getDay(lang = language) {
  const date = /* @__PURE__ */ new Date();
  return date.toLocaleDateString(lang, { weekday: "long" });
}
function getTime(lang = language) {
  const date = /* @__PURE__ */ new Date();
  return date.toLocaleTimeString(lang, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

export {
  language,
  getDate,
  getDay,
  getTime
};
