import { UserButton } from "@clerk/tanstack-react-start";
import { useNavigate } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";

interface Props {
  showName?: boolean;
}

export function UserControl({ showName }: Props) {
  const navigate = useNavigate();
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
    >
      <UserButton.MenuItems>
        <UserButton.Action
          label="Dashboard"
          labelIcon={<LayoutDashboard className="text-primary size-5" />}
          onClick={() =>
            navigate({
              to: "/dashboard",
            })
          }
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
