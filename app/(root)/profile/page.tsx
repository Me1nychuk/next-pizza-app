import { getUserSession } from "@/shared/lib/get-user-session";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getUserSession();
  if (!session) {
    return redirect("/not-auth");
  }
  return (
    <>
      <div>Page</div>
    </>
  );
};

export default Page;
