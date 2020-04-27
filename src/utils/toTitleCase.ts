export default function toTitleCase(string: string) {
  string = string.toLowerCase();
  return string[0].toUpperCase() + string.slice(1);
}
