/**
 * Tap-to-lift for touch screens (mouse users get the CSS hover lift).
 * Tapping a folder lifts it and lowers every other one; tapping it again lowers it.
 * Taps on links inside a folder are left alone so they navigate normally.
 */
export function initFolderLift(root: ParentNode = document): void {
  const folders = Array.from(root.querySelectorAll<HTMLElement>('.folder'));
  for (const folder of folders) {
    folder.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) return;
      const lift = !folder.classList.contains('is-lifted');
      for (const f of folders) f.classList.remove('is-lifted');
      if (lift) folder.classList.add('is-lifted');
    });
  }
}
