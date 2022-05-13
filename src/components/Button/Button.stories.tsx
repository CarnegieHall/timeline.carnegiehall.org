import { Button, ButtonProps } from '.';

export default {
  title: 'Components/Button',
  component: Button
};

export const Default = (props: ButtonProps) => (
  <Button {...props}>Click me</Button>
);

export const AsLink = ({ href = '/', ...props }: ButtonProps) => (
  <Button href={href} {...props}>
    Click me
  </Button>
);
