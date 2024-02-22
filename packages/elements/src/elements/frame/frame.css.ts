import { css } from 'lit';

export default css`
  :host {
    display: block;
    margin-bottom: 0.5em;
    border: 1px solid var(--sl-color-neutral-200);
    border-radius: 0.5rem;
  }
  .frame {
    object-fit: contain;
    object-position: top;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    border: none;
    color: var(--sl-color-neutral-900);
    background-color: var(--sl-color-neutral-50);
  }
  .border {
    border: 1px solid var(--sl-color-neutral-200);
    border-radius: 0.5em;
  }
`
