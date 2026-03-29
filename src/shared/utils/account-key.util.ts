export const extractAccountKey = (
  line: string,
  delimiter?: string | null,
  keyColumn?: number | null,
): string | null => {
  const trimmed = (line ?? '').trim();
  if (!trimmed) return null;

  const parts = delimiter ? trimmed.split(delimiter) : [trimmed];
  const idx = Math.max(0, (keyColumn ?? 1) - 1);
  const key = (parts[idx] ?? '').trim();
  return key || trimmed;
};

export const extractAccountKeys = (
  lines: string[],
  delimiter?: string | null,
  keyColumn?: number | null,
): string[] => {
  const keys = new Set<string>();
  lines.forEach((line) => {
    const key = extractAccountKey(line, delimiter, keyColumn);
    if (key) {
      keys.add(key);
    }
  });
  return Array.from(keys);
};
