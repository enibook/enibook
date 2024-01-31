import { css } from 'lit'

export default css`
:host {
  display: block;
  z-index: 1200; /* < sl-drawer */
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::slotted(*) {
  margin: 0;
}
.toolbar__start,
.toolbar__center,
.toolbar__end {
  display: flex;
}
.toolbar__top,
.toolbar__bottom {
  flex-direction: row;
  position: fixed;
  left: 0;
  right: 0;
}
.toolbar__top {
  top: 0;
}
.toolbar__bottom {
  bottom: 0;
}
.toolbar__left,
.toolbar__right {
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
}
.toolbar__left .toolbar__start,
.toolbar__right .toolbar__start,
.toolbar__left .toolbar__center,
.toolbar__right .toolbar__center,
.toolbar__left .toolbar__end,
.toolbar__right .toolbar__end {
  flex-direction: column;
  align-items: stretch;
}
.toolbar__left {
  left: 0;
}
.toolbar__right {
  right: 0;
}
`
