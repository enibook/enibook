import { css } from 'lit'

export default css`
:host {
  display: block;
}
.answer-form {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
.answer-form > * {
  flex-grow: 1;
  flex-basis: calc(( 45rem - 100%) * 999);
}
.answer-form > :nth-last-child(n+ 3),
.answer-form > :nth-last-child(n+ 3) ~ * {
  flex-basis: 100%;
}
.form,
.output {
  padding: var(--sl-spacing-medium);
  border: 1px solid var(--sl-color-neutral-200);
}
`
