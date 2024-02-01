import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
  }

  .primary-color__colors {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-gap: var(--sl-spacing-small);
    justify-items: center;
    z-index: var(--sl-z-index-dropdown);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    background: var(--sl-panel-background-color);
    padding: var(--sl-spacing-x-small);
  }
  .primary-color__ranges {
    background: var(--sl-panel-background-color);
    z-index: var(--sl-z-index-dropdown);
  }

  sl-range {
    --thumb-size: var(--sl-spacing-small);
    --tooltip-offset: calc(-1 * var(--sl-spacing-small));
    --track-color-active: var(--color-primary);
    --track-color-inactive: var(--sl-color-primary-200);
    --track-height: var(--sl-spacing-3x-small);
  }
  sl-range::part(base) {
    padding: var(--sl-spacing-small);
    padding-top: var(--sl-spacing-x-large);
  }
  sl-range::part(tooltip) {
    left: var(--sl-spacing-small);
  }
`;
