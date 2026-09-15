import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import { authOptions } from "@/lib/auth";
import { getRoleDashboardRoute } from "@/lib/role-router";
import { PlanningHomeView } from "@/features/planning-home/planning-home-view";

export const metadata: Metadata = {
  title: "Planning Home – CampusOS Academic Planning",
  description:
    "Academic Planning Administrator home view. Manage baselines, course offerings, timetables, and period workflows.",
};

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const roleName: string = (session?.activeRole as any)?.name ?? "";
  const correctRoute = getRoleDashboardRoute(roleName);

  const availableWorkspaces = (session?.availableWorkspaces as any[]) ?? [];
  if (availableWorkspaces.length > 1 && !roleName) {
    redirect("/workspace-selector");
  }

  // If this user's role belongs elsewhere, redirect them (safety net after proxy)
  if (correctRoute !== "/") {
    redirect(correctRoute);
  }

  return (
    <Suspense fallback={null}>
      <PlanningHomeView />
    </Suspense>
  );
}
