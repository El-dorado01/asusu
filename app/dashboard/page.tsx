import { useUser } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";
import { Protected } from "@/lib/protected";

export function UserMenu() {
  const { user } = useUser();

  return (
    <Protected>
      <div className="flex items-center gap-4">
        <span>Welcome, {user!.name}!</span>
        <form action={logoutAction}>
          <Button type="submit" variant="outline">
            Logout
          </Button>
        </form>
      </div>
    </Protected>
  );
}
