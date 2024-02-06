import { css } from 'lit';

export default css`
  :host {
    display: block;
    margin-bottom: 0.5em;
  }
  .code-it {
    display: flex;
    flex-direction: column;
  }
  .code-it:hover .menu-button {
    display: block;
  }
  .editor {
    outline: none;
    border-radius: 0.5em;
  }
  .editor-base {
    position: relative;
  }
  .cm-editor {
    border-radius: 0.375rem;
    padding: 4px 0;
  }
  .dropdown__shortcuts {
    font-size: 0.25rem;
  }
  .dropdown__shortcuts__label {
    display: inline-flex;
    justify-content: space-between;
  }
  .menu-button {
    display: none;
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .sl-toast-stack {
    left: auto;
    right: 0;
  }
`;
