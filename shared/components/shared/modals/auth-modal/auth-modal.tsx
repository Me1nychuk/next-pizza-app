import { Button, Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { RegisterForm, LoginForm } from "./forms";
import toast from "react-hot-toast";

interface AuthModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
}
export const AuthModal = ({ className, open, onClose }: AuthModalProps) => {
  const [type, setType] = React.useState<"login" | "register">("login");

  const handleTypeChange = () => {
    setType(type === "login" ? "register" : "login");
  };
  const handleClose = () => {
    onClose?.();
  };
  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className={cn("p-10 w-[450px]  bg-white ", className)}>
          {type === "login" ? (
            <LoginForm onClose={handleClose} />
          ) : (
            <RegisterForm onClose={handleClose} />
          )}
          <hr />
          <div className="flex gap-2 justify-center ">
            <Button
              variant="outline"
              className="flex items-center gap-1 flex-1"
              type="button"
              onClick={async () => {
                try {
                  await signIn("github", { callbackUrl: "/", redirect: true });
                  toast.success("Вхід в акаунт успішний", { icon: "✅" });
                } catch (error) {
                  console.error("[LoginForm] error", error);
                  toast.error("Не вдалося увійти", { icon: "❌" });
                }
              }}
            >
              <Image
                alt="github"
                width={24}
                height={24}
                src="https://github.githubassets.com/favicons/favicon.svg"
              />
              Github
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-1 flex-1"
              type="button"
              onClick={() =>
                signIn("google", { callbackUrl: "/", redirect: true })
              }
            >
              <Image
                alt="Google"
                width={24}
                height={24}
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              />
              Google
            </Button>
          </div>
          <Button
            onClick={handleTypeChange}
            className="h-12"
            type="button"
            variant="outline"
          >
            {type === "login" ? "Зареєструватися" : "Увійти"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
