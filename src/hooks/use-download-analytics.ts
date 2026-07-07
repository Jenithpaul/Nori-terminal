import { supabase } from "@/lib/supabase";
import { useCallback } from "react";

export function useDownloadAnalytics() {
  const trackDownload = useCallback(
    async (platform: string, installerType: string, version: string) => {
      try {
        await supabase.from("installs").insert({
          platform,
          installer_type: installerType,
          version,
        });
      } catch {
        // analytics should never block the user
      }
    },
    [],
  );

  return { trackDownload };
}
