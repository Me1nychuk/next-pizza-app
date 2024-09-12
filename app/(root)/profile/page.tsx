import { prisma } from "@/prisma/prisma-client";
import { ProfileForm } from "@/shared/components/shared";
import { getUserSession } from "@/shared/lib/get-user-session";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getUserSession();
  if (!session) {
    return redirect("/not-auth");
  }

  const currentUser = (await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  })) as User;

  if (!currentUser) {
    return redirect("/not-auth");
  }

  return <ProfileForm user={currentUser} />;
};

export default Page;
