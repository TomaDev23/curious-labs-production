import React from 'react';
import { ClIcon } from '../ConsultationIcons';

function Action({ href, className, children, ...rest }) {
  if (href) {
    return <a href={href} className={className} {...rest}>{children}</a>;
  }
  return <button type="button" className={className} {...rest}>{children}</button>;
}

/** Lime primary button; `icon` names a sprite symbol or `null` for none. */
export function PrimaryButton({ href, icon = 'arrow', className = '', children, ...rest }) {
  return (
    <Action href={href} className={`k-btn k-btn--primary ${className}`.trim()} {...rest}>
      <span>{children}</span>
      {icon && <ClIcon name={icon} className="k-btn__icon" />}
    </Action>
  );
}

export function GhostButton({ href, icon = 'arrow', className = '', children, ...rest }) {
  return (
    <Action href={href} className={`k-btn k-btn--ghost ${className}`.trim()} {...rest}>
      <span>{children}</span>
      {icon && <ClIcon name={icon} className="k-btn__icon" />}
    </Action>
  );
}

/**
 * 44px circular arrow. A link when `href` is set, otherwise a button (pass
 * aria-expanded / aria-controls / onClick through for toggles).
 */
export function CircleArrow({ href, label, direction = 'right', className = '', ...rest }) {
  return (
    <Action
      href={href}
      aria-label={label}
      className={`k-circle k-circle--${direction} ${className}`.trim()}
      {...rest}
    >
      <ClIcon name="arrow" className="k-circle__icon" />
    </Action>
  );
}
