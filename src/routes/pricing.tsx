import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  component: () => null,
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
