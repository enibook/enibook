import { css } from 'lit'

export default css`
:host {
  display: inline-block;
}

kbd {
  font-family: var(--sl-font-mono);
  background-color: var(--sl-color-neutral-50);
  border-radius: var(--sl-border-radius-small);
  border: 1px solid var(--sl-color-neutral-200);
  box-shadow: inset 0 1px 0 var(--color-white);
  padding: var(--sl-spacing-3x-small) var(--sl-spacing-2x-small);
}
`
