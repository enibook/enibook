import { css } from 'lit'

export default css`
:host {
  display: block;
  margin-bottom:  0.5rem;
}
p {
  margin: 0;
  margin-bottom: 0.5rem;
}
p:last-child {
  margin-bottom: 0;
}
ol,
ul,
dl {
  margin: 0;
}
dt {
  font-weight: 600;
}
`
