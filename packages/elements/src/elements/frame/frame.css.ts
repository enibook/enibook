import { css } from 'lit';

export default css`
  :host {
    display: block;
    margin-bottom: 0.5em;
    border: none;
    /*
    border: 1px solid var(--sl-color-neutral-200);
    border-radius: 1rem;
    */
  }
  .frame-it {
    height: inherit;
  }
  .frame {
    /*object-fit: contain;*/
    /*object-position: top;*/
    width: 100%;
    height: inherit;
    overflow-y: auto;
    border: none;
    color: var(--sl-color-neutral-900);
    background-color: var(--sl-color-neutral-100);
  }
  .border {
    border: 1px solid var(--sl-color-neutral-200);
    border-radius: 0.5em;
  }
`
