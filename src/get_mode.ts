export const get_mode = (): string => {
  const hash = new URLSearchParams(window.location.hash.substring(1));
  if (hash.has("mode")) {
    return hash.get("mode") as string;
  }
  return "normal";
};
