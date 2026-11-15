/**
 * Tap-to-lift for touch screens. Mouse users get the CSS hover lift instead,
 * so on devices that can hover a click does nothing here (otherwise a clicked
 * folder would stay stuck up after the mouse moves away).
 * Tapping a folder lifts it and lowers every other one; tapping it again lowers it.
 * Taps on links inside a folder are left alone so they navigate normally.
 */
export function initFolderLift(root: ParentNode = document): void {
  const folders = Array.from(root.querySelectorAll<HTMLElement>('.folder'));
  for (const folder of folders) {
    folder.addEventListener('click', (event) => {
      if (window.matchMedia('(hover: hover)').matches) return;
      if (event.target instanceof Element && event.target.closest('a')) return;
      const lift = !folder.classList.contains('is-lifted');
      for (const f of folders) f.classList.remove('is-lifted');
      if (lift) folder.classList.add('is-lifted');
    });
  }
}
