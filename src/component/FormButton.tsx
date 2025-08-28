import React from 'react';

type FormButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  btnText: string;
};

const FormButton = ({ btnText, ...props }: FormButtonProps) => {
  return (
    <button type="submit" {...props}>
      {btnText}
    </button>
  );
};

export default FormButton;
