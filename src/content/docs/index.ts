import { lazy } from "react";

export const contentMap: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  install: lazy(() => import("./install.mdx")),
  fonts: lazy(() => import("./fonts.mdx")),
  "first-run": lazy(() => import("./first-run.mdx")),
  config: lazy(() => import("./config.mdx")),
  terminal: lazy(() => import("./terminal.mdx")),
  "slash-cmds": lazy(() => import("./slash-cmds.mdx")),
  "git-aliases": lazy(() => import("./git-aliases.mdx")),
  "git-panel": lazy(() => import("./git-panel.mdx")),
  docker: lazy(() => import("./docker.mdx")),
  files: lazy(() => import("./files.mdx")),
  monitor: lazy(() => import("./monitor.mdx")),
  panels: lazy(() => import("./panels.mdx")),
  keybindings: lazy(() => import("./keybindings.mdx")),
  mouse: lazy(() => import("./mouse.mdx")),
  history: lazy(() => import("./history.mdx")),
  themes: lazy(() => import("./themes.mdx")),
  "shell-int": lazy(() => import("./shell-int.mdx")),
  architecture: lazy(() => import("./architecture.mdx")),
};
