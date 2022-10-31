import React from 'react';
import './button.css'

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  styles?:{};
  icon?: object;
  onClick?: () => void;
  handleClick?: ()=> void;
}


export const Button = ({
  primary = false,
  size = 'medium',
  label,
  onClick,
  handleClick,
  styles,
  icon,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <>
    {icon && icon}
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={styles}
      onClick={handleClick}
      {...props}
    >
      {label}
    </button>
    </>
  );
};
