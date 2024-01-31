import {
  T,
  b,
  w
} from "./chunk.73N5W5FM.js";

// ../../node_modules/.pnpm/lit-html@3.1.1/node_modules/lit-html/directive.js
var t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e = (t2) => (...e3) => ({ _$litDirective$: t2, values: e3 });
var i = class {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e3, i2) {
    this._$Ct = t2, this._$AM = e3, this._$Ci = i2;
  }
  _$AS(t2, e3) {
    return this.update(t2, e3);
  }
  update(t2, e3) {
    return this.render(...e3);
  }
};

// ../../node_modules/.pnpm/lit-html@3.1.1/node_modules/lit-html/directives/unsafe-html.js
var e2 = class extends i {
  constructor(i2) {
    if (super(i2), this.et = T, i2.type !== t.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r) {
    if (r === T || null == r)
      return this.vt = void 0, this.et = r;
    if (r === w)
      return r;
    if ("string" != typeof r)
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r === this.et)
      return this.vt;
    this.et = r;
    const s = [r];
    return s.raw = s, this.vt = { _$litType$: this.constructor.resultType, strings: s, values: [] };
  }
};
e2.directiveName = "unsafeHTML", e2.resultType = 1;
var o = e(e2);

// src/utilities/icons.ts
var style = "display:inline-block;vertical-align:middle;";
var icons = {
  "language-asciidoctor": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.069 0H5.932A5.934 5.934 0 0 0 0 5.932v12.136A5.935 5.935 0 0 0 5.932 24h12.136A5.934 5.934 0 0 0 24 18.068V5.932A5.934 5.934 0 0 0 18.069 0m-7.361 15.404H8.81l-.005.013L7.2 19.282a.506.506 0 1 1-.934-.388l1.45-3.49H4.868a.506.506 0 1 1 0-1.012h5.84a.506.506 0 1 1 0 1.012m7.919 4.165a.506.506 0 0 1-.655-.29L12.621 6.232l-2.395 5.76h1.55a.506.506 0 1 1 0 1.012h-5.84a.506.506 0 1 1 0-1.011h3.195l.004-.012l3.022-7.269a.506.506 0 0 1 .457-.311a.506.506 0 0 1 .478.314l5.816 14.182a.506.506 0 0 1-.281.673"/></svg>`,
  "language-prolog": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><text x="2" y="15" fill="currentColor" style="font-weight:bold;font-size:inherit">?-</text></svg>`,
  "mdi-account": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>`,
  "mdi-alert-outline": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2"/></svg>`,
  "mdi-bell-outline": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2m11-2v1H3v-1l2-2v-6c0-3.1 2-5.8 5-6.7V4c0-1.1.9-2 2-2s2 .9 2 2v.3c3 .9 5 3.6 5 6.7v6l2 2m-4-8c0-2.8-2.2-5-5-5s-5 2.2-5 5v7h10v-7Z"/></svg>`,
  "mdi-bell-off-outline": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M22.11 21.46L2.39 1.73L1.11 3l4.72 4.72A6.975 6.975 0 0 0 5 11v6l-2 2v1h15.11l2.73 2.73l1.27-1.27M7 18v-7c0-.61.11-1.21.34-1.77L16.11 18H7m3 3h4a2 2 0 0 1-2 2a2 2 0 0 1-2-2M8.29 5.09c.53-.34 1.11-.59 1.71-.8V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v4.8l-2-2V11a5 5 0 0 0-5-5c-.78 0-1.55.2-2.24.56L8.29 5.09Z"/></svg>`,
  "mdi-calendar-clock-outline": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 1v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h6.1c1.26 1.24 2.99 2 4.9 2c3.87 0 7-3.13 7-7c0-1.91-.76-3.64-2-4.9V5a2 2 0 0 0-2-2h-1V1h-2v2H8V1M5 5h14v2H5m0 2h14v.67c-.91-.43-1.93-.67-3-.67c-3.87 0-7 3.13-7 7c0 1.07.24 2.09.67 3H5m11-7.85c2.68 0 4.85 2.17 4.85 4.85c0 2.68-2.17 4.85-4.85 4.85c-2.68 0-4.85-2.17-4.85-4.85c0-2.68 2.17-4.85 4.85-4.85M15 13v3.69l3.19 1.84l.75-1.3l-2.44-1.41V13Z"/></svg>`,
  "mdi-check-circle-outline": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4l8-8l-1.41-1.42Z"/></svg>`,
  "mdi-code-json": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h2v2H5v5a2 2 0 0 1-2 2a2 2 0 0 1 2 2v5h2v2H5c-1.07-.27-2-.9-2-2v-4a2 2 0 0 0-2-2H0v-2h1a2 2 0 0 0 2-2V5a2 2 0 0 1 2-2m14 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2a2 2 0 0 1-2-2V5h-2V3h2m-7 12a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m-4 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m8 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1Z"/></svg>`,
  "mdi-cog": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"/></svg>`,
  "mdi-content-copy": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12V1Z"/></svg>`,
  "mdi-database": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4s8-1.79 8-4s-3.58-4-8-4M4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4m0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4Z"/></svg>`,
  "mdi-dots-horizontal": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2Z"/></svg>`,
  "mdi-dots-vertical": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2Z"/></svg>`,
  "mdi-drag-vertical": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3h2v2H9V3m4 0h2v2h-2V3M9 7h2v2H9V7m4 0h2v2h-2V7m-4 4h2v2H9v-2m4 0h2v2h-2v-2m-4 4h2v2H9v-2m4 0h2v2h-2v-2m-4 4h2v2H9v-2m4 0h2v2h-2v-2Z"/></svg>`,
  "mdi-find-replace": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05A6.976 6.976 0 0 0 11 4c-3.53 0-6.43 2.61-6.92 6H6.1A5 5 0 0 1 11 6m5.64 9.14A6.89 6.89 0 0 0 17.92 12H15.9a5 5 0 0 1-4.9 4c-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05A6.976 6.976 0 0 0 11 18c1.55 0 3-.5 4.14-1.36L20 21.5l1.5-1.5l-4.86-4.86Z"/></svg>`,
  "mdi-format-indent-decrease": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13h10v-2H11m0-2h10V7H11M3 3v2h18V3M3 21h18v-2H3m0-7l4 4V8m4 9h10v-2H11v2Z"/></svg>`,
  "mdi-format-indent-increase": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13h10v-2H11m0-2h10V7H11M3 3v2h18V3M11 17h10v-2H11M3 8v8l4-4m-4 9h18v-2H3v2Z"/></svg>`,
  "mdi-format-list-group": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 5v14h2v2H3V3h4v2H5m15 2H7v2h13V7m0 4H7v2h13v-2m0 4H7v2h13v-2Z"/></svg>`,
  "mdi-format-list-numbered": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 13v-2h14v2H7m0 6v-2h14v2H7M7 7V5h14v2H7M3 8V5H2V4h2v4H3m-1 9v-1h3v4H2v-1h2v-.5H3v-1h1V17H2m2.25-7a.75.75 0 0 1 .75.75c0 .2-.08.39-.21.52L3.12 13H5v1H2v-.92L4 11H2v-1h2.25Z"/></svg>`,
  "mdi-format-text": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m18.5 4l1.16 4.35l-.96.26c-.45-.87-.91-1.74-1.44-2.18C16.73 6 16.11 6 15.5 6H13v10.5c0 .5 0 1 .33 1.25c.34.25 1 .25 1.67.25v1H9v-1c.67 0 1.33 0 1.67-.25c.33-.25.33-.75.33-1.25V6H8.5c-.61 0-1.23 0-1.76.43c-.53.44-.99 1.31-1.44 2.18l-.96-.26L5.5 4h13Z"/></svg>`,
  "mdi-fullscreen": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 5h5v2H7v3H5V5m9 0h5v5h-2V7h-3V5m3 9h2v5h-5v-2h3v-3m-7 3v2H5v-5h2v3h3Z"/></svg>`,
  "mdi-fullscreen-exit": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M14 14h5v2h-3v3h-2v-5m-9 0h5v5H8v-3H5v-2m3-9h2v5H5V8h3V5m11 3v2h-5V5h2v3h3Z"/></svg>`,
  "mdi-github": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>`,
  "mdi-home": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/></svg>`,
  "mdi-information-variant-circle-outline": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12.3 7.29c.2-.18.44-.29.7-.29c.27 0 .5.11.71.29c.19.21.29.45.29.71c0 .27-.1.5-.29.71c-.21.19-.44.29-.71.29c-.26 0-.5-.1-.7-.29c-.19-.21-.3-.44-.3-.71c0-.26.11-.5.3-.71m-2.5 4.68s2.17-1.72 2.96-1.79c.74-.06.59.79.52 1.23l-.01.06c-.14.53-.31 1.17-.48 1.78c-.38 1.39-.75 2.75-.66 3c.1.34.72-.09 1.17-.39c.06-.04.11-.08.16-.11c0 0 .08-.08.16.03c.02.03.04.06.06.08c.09.14.14.19.02.27l-.04.02c-.22.15-1.16.81-1.54 1.05c-.41.27-1.98 1.17-1.74-.58c.21-1.23.49-2.29.71-3.12c.41-1.5.59-2.18-.33-1.59c-.37.22-.59.36-.72.45c-.11.08-.12.08-.19-.05l-.03-.06l-.05-.08c-.07-.1-.07-.11.03-.2M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-2 0c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8Z"/></svg>`,
  "mdi-keyboard": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 10h-2V8h2m0 5h-2v-2h2m-3-1h-2V8h2m0 5h-2v-2h2m0 6H8v-2h8m-9-5H5V8h2m0 5H5v-2h2m1 0h2v2H8m0-5h2v2H8m3 1h2v2h-2m0-5h2v2h-2m9-5H4c-1.11 0-2 .89-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/></svg>`,
  "mdi-keyboard-off-outline": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m1 4.27l1.47 1.47A1.9 1.9 0 0 0 2 7v10a2 2 0 0 0 2 2h11.73l3 3L20 20.72L2.28 3L1 4.27M4 17V7.27l1 1V10h1.73L8 11.27V13h1.73l1 1H8v2h4.73l1 1H4m1-6h2v2H5v-2m12 0h2v2h-2v-2m2-1h-2V8h2v2m-5 1h2v2h-1.17l-.83-.83V11m-1-1h-1.17L11 9.17V8h2v2m9-3v10c0 .86-.55 1.58-1.3 1.87L18.83 17H20V7H8.83l-2-2H20a2 2 0 0 1 2 2m-6 3h-2V8h2v2Z"/></svg>`,
  "mdi-keyboard-outline": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4m0 2h16v10H4V7m1 1v2h2V8H5m3 0v2h2V8H8m3 0v2h2V8h-2m3 0v2h2V8h-2m3 0v2h2V8h-2M5 11v2h2v-2H5m3 0v2h2v-2H8m3 0v2h2v-2h-2m3 0v2h2v-2h-2m3 0v2h2v-2h-2m-9 3v2h8v-2H8Z"/></svg>`,
  "mdi-language-asciidoc": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 496 512"><path fill="currentColor" d="M21.771 336.508c-23.15-.464-23.15 34.5 0 34.035h95.833l-48.817 117.45c-9.029 21.083 22.85 34.34 31.432 13.07l54.011-130.52h64.094c23.15.464 23.15-34.5 0-34.035zM282.088.01c-6.295.225-12.345 4.023-14.986 10.678L165.16 255.705H17.367c-23.155-.47-23.155 34.5 0 34.031h236.916c23.155.47 23.155-34.5 0-34.03h-52.197L282.69 61.817l180.114 439.174c8.366 21.573 40.683 8.311 31.488-12.922L298.551 10.77C294.925 3.133 288.383-.215 282.088.01z"/></svg>`,
  "mdi-language-css": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m5 3l-.65 3.34h13.59L17.5 8.5H3.92l-.66 3.33h13.59l-.76 3.81l-5.48 1.81l-4.75-1.81l.33-1.64H2.85l-.79 4l7.85 3l9.05-3l1.2-6.03l.24-1.21L21.94 3H5Z"/></svg>`,
  "mdi-language-css3": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m5 3l-.65 3.34h13.59L17.5 8.5H3.92l-.66 3.33h13.59l-.76 3.81l-5.48 1.81l-4.75-1.81l.33-1.64H2.85l-.79 4l7.85 3l9.05-3l1.2-6.03l.24-1.21L21.94 3H5Z"/></svg>`,
  "mdi-language-html": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 17.56l4.07-1.13l.55-6.1H9.38L9.2 8.3h7.6l.2-1.99H7l.56 6.01h6.89l-.23 2.58l-2.22.6l-2.22-.6l-.14-1.66h-2l.29 3.19L12 17.56M4.07 3h15.86L18.5 19.2L12 21l-6.5-1.8L4.07 3Z"/></svg>`,
  "mdi-language-html5": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 17.56l4.07-1.13l.55-6.1H9.38L9.2 8.3h7.6l.2-1.99H7l.56 6.01h6.89l-.23 2.58l-2.22.6l-2.22-.6l-.14-1.66h-2l.29 3.19L12 17.56M4.07 3h15.86L18.5 19.2L12 21l-6.5-1.8L4.07 3Z"/></svg>`,
  "mdi-language-javascript": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v18H3V3m4.73 15.04c.4.85 1.19 1.55 2.54 1.55c1.5 0 2.53-.8 2.53-2.55v-5.78h-1.7V17c0 .86-.35 1.08-.9 1.08c-.58 0-.82-.4-1.09-.87l-1.38.83m5.98-.18c.5.98 1.51 1.73 3.09 1.73c1.6 0 2.8-.83 2.8-2.36c0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02c0-.41.31-.73.81-.73c.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33c-1.51 0-2.48.96-2.48 2.23c0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13c0 .48-.45.83-1.15.83c-.83 0-1.31-.43-1.67-1.03l-1.38.8Z"/></svg>`,
  "mdi-language-json": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h2v2H5v5a2 2 0 0 1-2 2a2 2 0 0 1 2 2v5h2v2H5c-1.07-.27-2-.9-2-2v-4a2 2 0 0 0-2-2H0v-2h1a2 2 0 0 0 2-2V5a2 2 0 0 1 2-2m14 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2a2 2 0 0 1-2-2V5h-2V3h2m-7 12a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m-4 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m8 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1Z"/></svg>`,
  "mdi-language-markdown": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6h17.12c.79 0 1.44.63 1.44 1.41v9.18c0 .78-.65 1.41-1.44 1.41M6.81 15.19v-3.66l1.92 2.35l1.92-2.35v3.66h1.93V8.81h-1.93l-1.92 2.35l-1.92-2.35H4.89v6.38h1.92M19.69 12h-1.92V8.81h-1.92V12h-1.93l2.89 3.28L19.69 12Z"/></svg>`,
  "mdi-language-prolog": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><text x="2" y="15" fill="currentColor" style="font-weight:bold;font-size:inherit">?-</text></svg>`,
  "mdi-language-python": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em"viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 7.5A2.86 2.86 0 0 1 22 10.36v3.78A2.86 2.86 0 0 1 19.14 17H12c0 .39.32.96.71.96H17v1.68a2.86 2.86 0 0 1-2.86 2.86H9.86A2.86 2.86 0 0 1 7 19.64v-3.75a2.85 2.85 0 0 1 2.86-2.85h5.25a2.85 2.85 0 0 0 2.85-2.86V7.5h1.18m-4.28 11.79c-.4 0-.72.3-.72.89c0 .59.32.71.72.71a.71.71 0 0 0 .71-.71c0-.59-.32-.89-.71-.89m-10-1.79A2.86 2.86 0 0 1 2 14.64v-3.78A2.86 2.86 0 0 1 4.86 8H12c0-.39-.32-.96-.71-.96H7V5.36A2.86 2.86 0 0 1 9.86 2.5h4.28A2.86 2.86 0 0 1 17 5.36v3.75a2.85 2.85 0 0 1-2.86 2.85H8.89a2.85 2.85 0 0 0-2.85 2.86v2.68H4.86M9.14 5.71c.4 0 .72-.3.72-.89c0-.59-.32-.71-.72-.71c-.39 0-.71.12-.71.71s.32.89.71.89Z"/></svg>`,
  "mdi-language-sql": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4s8-1.79 8-4s-3.58-4-8-4M4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4m0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4Z"/></svg>`,
  "mdi-language-text": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m18.5 4l1.16 4.35l-.96.26c-.45-.87-.91-1.74-1.44-2.18C16.73 6 16.11 6 15.5 6H13v10.5c0 .5 0 1 .33 1.25c.34.25 1 .25 1.67.25v1H9v-1c.67 0 1.33 0 1.67-.25c.33-.25.33-.75.33-1.25V6H8.5c-.61 0-1.23 0-1.76.43c-.53.44-.99 1.31-1.44 2.18l-.96-.26L5.5 4h13Z"/></svg>`,
  "mdi-language-typescript": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v18H3V3m10.71 14.86c.5.98 1.51 1.73 3.09 1.73c1.6 0 2.8-.83 2.8-2.36c0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02c0-.41.31-.73.81-.73c.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33c-1.51 0-2.48.96-2.48 2.23c0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13c0 .48-.45.83-1.15.83c-.83 0-1.31-.43-1.67-1.03l-1.38.8M13 11.25H8v1.5h1.5V20h1.75v-7.25H13v-1.5Z"/></svg>`,
  "mdi-menu-close": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h10v2H3V6m0 10h10v2H3v-2m0-5h12v2H3v-2m13-4l-1.42 1.39L18.14 12l-3.56 3.61L16 17l5-5l-5-5Z"/></svg>`,
  "mdi-menu-open": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 15.61L19.59 17l-5.01-5l5.01-5L21 8.39L17.44 12L21 15.61M3 6h13v2H3V6m0 7v-2h10v2H3m0 5v-2h13v2H3Z"/></svg>`,
  "mdi-monitor-eye": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4v12h18V4zm0-2h18a2 2 0 0 1 2 2v12c0 .53-.21 1.04-.59 1.41c-.37.38-.88.59-1.41.59h-7v2h2v2H8v-2h2v-2H3c-.53 0-1.04-.21-1.41-.59C1.21 17.04 1 16.53 1 16V4c0-1.11.89-2 2-2m7.84 6.93c.31-.3.73-.48 1.16-.48c.43.01.85.18 1.16.49c.3.3.48.72.48 1.15c0 .44-.18.85-.48 1.16c-.31.31-.73.48-1.16.48c-.43 0-.85-.18-1.16-.48c-.3-.31-.48-.72-.48-1.16c0-.43.18-.85.48-1.16M10.07 12a2.679 2.679 0 0 0 3.86 0c.51-.5.8-1.19.8-1.91s-.29-1.42-.8-1.93s-1.21-.8-1.93-.8s-1.42.29-1.93.8s-.8 1.21-.8 1.93s.29 1.41.8 1.91M6 10.09A6.45 6.45 0 0 1 12 6c2.73 0 5.06 1.7 6 4.09a6.421 6.421 0 0 1-6 4.09c-2.73 0-5.06-1.68-6-4.09"/></svg>`,
  "mdi-mouse": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 1.07C7.05 1.56 4 4.92 4 9h7m-7 6a8 8 0 0 0 8 8a8 8 0 0 0 8-8v-4H4m9-9.93V9h7c0-4.08-3.06-7.44-7-7.93Z"/></svg>`,
  "mdi-mouse-off": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2 5.27L3.28 4L20 20.72L18.73 22l-1.23-1.21A7.892 7.892 0 0 1 12 23a8 8 0 0 1-8-8v-4h3.73l-2-2H4c0-.54.05-1.07.15-1.58L2 5.27m9-4.2V9h-.18L5.79 3.96A7.95 7.95 0 0 1 11 1.07M20 11v4c0 .95-.17 1.86-.47 2.71L12.82 11H20m-7-9.93c3.94.49 7 3.85 7 7.93h-7V1.07Z"/></svg>`,
  "mdi-palette-outline": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22A10 10 0 0 1 2 12A10 10 0 0 1 12 2c5.5 0 10 4 10 9a6 6 0 0 1-6 6h-1.8c-.3 0-.5.2-.5.5c0 .1.1.2.1.3c.4.5.6 1.1.6 1.7c.1 1.4-1 2.5-2.4 2.5m0-18a8 8 0 0 0-8 8a8 8 0 0 0 8 8c.3 0 .5-.2.5-.5c0-.2-.1-.3-.1-.4c-.4-.5-.6-1-.6-1.6c0-1.4 1.1-2.5 2.5-2.5H16a4 4 0 0 0 4-4c0-3.9-3.6-7-8-7m-5.5 6c.8 0 1.5.7 1.5 1.5S7.3 13 6.5 13S5 12.3 5 11.5S5.7 10 6.5 10m3-4c.8 0 1.5.7 1.5 1.5S10.3 9 9.5 9S8 8.3 8 7.5S8.7 6 9.5 6m5 0c.8 0 1.5.7 1.5 1.5S15.3 9 14.5 9S13 8.3 13 7.5S13.7 6 14.5 6m3 4c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5"/></svg>`,
  "mdi-play": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v14l11-7l-11-7Z"/></svg>`,
  "mdi-redo": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 10.6C16.55 9 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6Z"/></svg>`,
  "mdi-refresh": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><g transform="translate(24 0) scale(-1 1)"><path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0 0 12 4a8 8 0 0 0-8 8a8 8 0 0 0 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18a6 6 0 0 1-6-6a6 6 0 0 1 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z"/></g></svg>`,
  "mdi-square-edit-outline": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7H5V5h7V3H5m12.78 1a.69.69 0 0 0-.48.2l-1.22 1.21l2.5 2.5L19.8 6.7c.26-.26.26-.7 0-.95L18.25 4.2c-.13-.13-.3-.2-.47-.2m-2.41 2.12L8 13.5V16h2.5l7.37-7.38l-2.5-2.5Z"/></svg>`,
  "mdi-text-search": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m19.31 18.9l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5s4.5 2 4.5 4.5c0 .88-.25 1.71-.69 2.4m-3.81.1a2.5 2.5 0 0 0 0-5a2.5 2.5 0 0 0 0 5M21 4v2H3V4h18M3 16v-2h6v2H3m0-5V9h18v2h-2.03c-1.01-.63-2.2-1-3.47-1s-2.46.37-3.47 1H3Z"/></svg>`,
  "mdi-theme-light-dark": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 2c-1.79 1.15-3 3.18-3 5.5s1.21 4.35 3.03 5.5C4.46 13 2 10.54 2 7.5A5.5 5.5 0 0 1 7.5 2m11.57 1.5l1.43 1.43L4.93 20.5L3.5 19.07L19.07 3.5m-6.18 2.43L11.41 5L9.97 6l.42-1.7L9 3.24l1.75-.12l.58-1.65L12 3.1l1.73.03l-1.35 1.13l.51 1.67m-3.3 3.61l-1.16-.73l-1.12.78l.34-1.32l-1.09-.83l1.36-.09l.45-1.29l.51 1.27l1.36.03l-1.05.87l.4 1.31M19 13.5a5.5 5.5 0 0 1-5.5 5.5c-1.22 0-2.35-.4-3.26-1.07l7.69-7.69c.67.91 1.07 2.04 1.07 3.26m-4.4 6.58l2.77-1.15l-.24 3.35l-2.53-2.2m4.33-2.7l1.15-2.77l2.2 2.54l-3.35.23m1.15-4.96l-1.14-2.78l3.34.24l-2.2 2.54M9.63 18.93l2.77 1.15l-2.53 2.19l-.24-3.34Z"/></svg>`,
  "mdi-tools": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m21.71 20.29l-1.42 1.42a1 1 0 0 1-1.41 0L7 9.85A3.81 3.81 0 0 1 6 10a4 4 0 0 1-3.78-5.3l2.54 2.54l.53-.53l1.42-1.42l.53-.53L4.7 2.22A4 4 0 0 1 10 6a3.81 3.81 0 0 1-.15 1l11.86 11.88a1 1 0 0 1 0 1.41M2.29 18.88a1 1 0 0 0 0 1.41l1.42 1.42a1 1 0 0 0 1.41 0l5.47-5.46l-2.83-2.83M20 2l-4 2v2l-2.17 2.17l2 2L18 8h2l2-4Z"/></svg>`,
  "mdi-typescript": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v18H3V3m10.71 14.86c.5.98 1.51 1.73 3.09 1.73c1.6 0 2.8-.83 2.8-2.36c0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02c0-.41.31-.73.81-.73c.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33c-1.51 0-2.48.96-2.48 2.23c0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13c0 .48-.45.83-1.15.83c-.83 0-1.31-.43-1.67-1.03l-1.38.8M13 11.25H8v1.5h1.5V20h1.75v-7.25H13v-1.5Z"/></svg>`,
  "mdi-undo": `<svg xmlns="http://www.w3.org/2000/svg" style="${style}" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8Z"/></svg>`
};
function svgIcon(icon) {
  return b`${o(icons[icon])}`;
}

export {
  t,
  e,
  i,
  o,
  icons,
  svgIcon
};
/*! Bundled license information:

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
