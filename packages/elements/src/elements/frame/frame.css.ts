import { css } from 'lit';

export default css`
  :host {
    display: block;
    margin-bottom: 0.5em;
  }

  .frame {
    object-fit: contain;
    object-position: top;
    width: 100%;
    height: 100%;
    border: 1px solid var(--sl-color-neutral-200);
    overflow-y: auto
  }
`
