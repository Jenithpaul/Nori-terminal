import { useState, useEffect } from "react";
import { getLatestRelease, getAllReleases, type GithubRelease } from "@/lib/github.server";

const CACHE_PREFIX = "nori-github-";
const CACHE_TTL = 1000 * 60 * 30;

function cacheGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL) return data as T;
  } catch {
    // cache miss — will refetch
  }
  return null;
}

function cacheSet(key: string, data: unknown) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // storage full or unavailable — ignore
  }
}

export function useLatestRelease() {
  const [release, setRelease] = useState<GithubRelease | null>(() =>
    cacheGet<GithubRelease>("latest"),
  );
  const [loading, setLoading] = useState(!release);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLatestRelease()
      .then((data) => {
        setRelease(data);
        cacheSet("latest", data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { release, loading, error };
}

export function useAllReleases() {
  const [releases, setReleases] = useState<GithubRelease[] | null>(() =>
    cacheGet<GithubRelease[]>("all"),
  );
  const [loading, setLoading] = useState(!releases);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllReleases()
      .then((data) => {
        setReleases(data);
        cacheSet("all", data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { releases, loading, error };
}

export function versionFromTag(tag: string): string {
  return tag.replace(/^v/, "");
}

export function findAsset(assets: GithubRelease["assets"], pattern: RegExp) {
  return assets.find((a) => pattern.test(a.name));
}

export function findAltAssets(assets: GithubRelease["assets"], patterns: RegExp[]) {
  return patterns
    .map((p) => assets.find((a) => p.test(a.name)))
    .filter(Boolean) as GithubRelease["assets"];
}
