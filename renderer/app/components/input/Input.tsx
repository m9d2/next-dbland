import React from 'react';

const Input = React.forwardRef(function Input(
  props: Input.Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return <></>;
});

namespace Input {
  export interface Props {}

  export interface State {}
}

export { Input };