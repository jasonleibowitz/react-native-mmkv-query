import { Link } from "expo-router";
import { Button } from "tamagui";

type LinkButtonProps = {
  children: JSX.Element | string;
  href: string;
};
export const LinkButton = ({ children, href, ...rest }: LinkButtonProps) => {
  return (
    <Link href={href} asChild>
      <Button width="50%" alignSelf="center" marginVertical={10} {...rest}>
        {children}
      </Button>
    </Link>
  );
};
