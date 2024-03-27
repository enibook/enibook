import { css } from 'lit';

export default css`
  :host {
    display: block;
    margin-bottom: 0.5em;
  }

  [part="base"] {
    display: flex;
    flex-wrap: wrap;
  }
  [part="base"] > * {
    flex-grow: 1;
    flex-basis: calc(( 40rem - 100%) * 999);
  }
  [part="base"] > :nth-last-child(n+ 3),
  [part="base"] > :nth-last-child(n+ 3) ~ * {
  flex-basis: 100%;
}

  /*
  .playground-it {
    display: flex;
    flex-wrap: wrap;
    align-items: top;
    gap: 0;
  }
  .playground-it > * {
    flex-grow: 1;
    flex-basis: calc((45rem - 100%) * 999);
  }
  .playground-it > :nth-last-child(n+ 3),
  .playground-it > :nth-last-child(n+ 3) ~ * {
    flex-basis: 100%;
  }
  */
`
