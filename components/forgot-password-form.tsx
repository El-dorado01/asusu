import { IconLogin2, IconUsersGroup } from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <IconUsersGroup className="size-6" />
              </div>
              <span className="sr-only">Asusu HQ</span>
            </Link>
            <h1 className="text-xl font-bold">Input your email to Asusu HQ.</h1>
            <FieldDescription>
              Forgot your password? Don&apos;t fret!{" "}
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>
          <Field>
            <Button type="submit">Retrieve Password</Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4">
            <Button variant="outline" type="button">
              <IconLogin2 className="size-4" />
              Sign in instead
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
