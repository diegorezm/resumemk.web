import { UserButton } from "@clerk/tanstack-react-start";

interface Props {
  showName?: boolean;
}

export function UserControl({ showName }: Props) {
  return (
    <UserButton
      showName={showName}
      appearance={{
        elements: {
          userButtonBox: "rounded-md!",
          userButtonAvatarBox: "rounded-md! size-8!",
          userButtonTrigger: "rounded-md!",
        },
      }}
    />
  );
}
