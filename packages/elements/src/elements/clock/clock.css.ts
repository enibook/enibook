import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
  }
  .time.clock__time {
    margin: 0 var(--sl-spacing-large);
  }

  sl-dropdown:not(.control)::part(panel) {
    padding: var(--sl-spacing-small);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
  }
`;
