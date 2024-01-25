"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import type { Options } from "@emotion/cache";
import createCache from "@emotion/cache";

import { MuiThemeProvider } from "../theme-provider";

export interface MuiThemeRegistryProps {
  options: Options;
  children: React.ReactElement;
}

export function MuiThemeRegistry({
  options,
  children,
}: MuiThemeRegistryProps): React.ReactElement {
  const [emotion] = useState(() => {
    const cache = createCache(options);

    cache.compat = true;

    const prevInsert = cache.insert;

    let inserted: string[] = [];

    cache.insert = (...args) => {
      const serialized = args[1];

      if (!cache.inserted[serialized.name]) {
        inserted.push(serialized.name);
      }

      return prevInsert(...args);
    };

    const flush = (): string[] => {
      const prevInserted = inserted;

      inserted = [];

      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = emotion.flush();

    if (names.length === 0) return null;

    let styles = "";

    for (const name of names) {
      styles += emotion.cache.inserted[name];
    }

    const key = globalThis.crypto.randomUUID();

    return (
      <style
        key={key}
        data-emotion={`${key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={emotion.cache}>
      <MuiThemeProvider>{children}</MuiThemeProvider>
    </CacheProvider>
  );
}
