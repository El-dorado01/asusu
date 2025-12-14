import { IconSend, IconUsersGroup } from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import Link from "next/link";
import { InputOTPField } from "@/components/input-otp";

export function ResetPasswordForm({
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
            <h1 className="text-xl font-bold">Input OTP sent to your email.</h1>
            <FieldDescription>
              An OTP has been sent to your email.
            </FieldDescription>
          </div>
          <Field>
            <InputOTPField />
          </Field>
          <Field>
            <Button type="submit">Reset Password</Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4">
            <Button variant="outline" type="button">
              <IconSend className="size-4" />
              Resend OTP
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
