import React, { useMemo } from 'react';
import { RegularButton, InlineButton, IconButton } from './ButtonCss';
import { Link } from 'react-router-dom';

function Button({ variant, children, ...props }) {
  const { to } = props;
  const Component = useMemo(() => {
    switch (variant) {
      case 'inline':
        return InlineButton;
      case 'regular':
        return RegularButton;
      case 'iconButton':
        return IconButton;
      default:
        return RegularButton;
    }
  }, [variant]);

  const content = useMemo(() => <Component {...props}>{children}</Component>, [props, children]);

  return to ? <Link {...props}>{content}</Link> : <>{content}</>;
}

export default Button;
