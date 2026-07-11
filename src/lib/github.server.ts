import { createServerFn } from "@tanstack/react-start";

const OWNER = "Aethlon";
const REPO = "Nori";
const PER_PAGE = 10;

export interface GithubAsset {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
}

export interface GithubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  published_at: string;
  assets: GithubAsset[];
}

async function githubFetch(path: string) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}${path}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "nori-website",
    },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

export const getLatestRelease = createServerFn({ method: "GET" }).handler(async () => {
  const data = await githubFetch("/releases/latest");
  return data as GithubRelease;
});

export const getAllReleases = createServerFn({ method: "GET" }).handler(async () => {
  const data = await githubFetch(`/releases?per_page=${PER_PAGE}`);
  return data as GithubRelease[];
});
