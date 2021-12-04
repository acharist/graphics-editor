export default function defineClick(target: HTMLElement, tag: string) {
  while (target !== this) {
    if (target.tagName === tag) {
      return target.dataset.tool;
    } else {
      target = target.parentElement;
    }
  }
}
