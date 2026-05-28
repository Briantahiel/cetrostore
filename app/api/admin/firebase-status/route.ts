import { getFirebaseConfigStatus } from "@/lib/firebase-admin";
import { requireAdminSession } from "@/lib/admin-session";

export async function GET() {
  await requireAdminSession();

  return Response.json(getFirebaseConfigStatus());
}
