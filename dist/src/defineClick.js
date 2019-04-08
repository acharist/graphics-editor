export default function defineClick(target, tag) {
    while (target !== this) {
        if (target.tagName === tag) {
            return target.dataset.tool;
        }
        else {
            target = target.parentElement;
        }
    }
}
