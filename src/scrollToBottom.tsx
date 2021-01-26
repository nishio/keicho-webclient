export const scrollToBottom = () => {
  const e = document.getElementById("bottom") as HTMLElement;
  const y = e.offsetTop - document.documentElement.clientHeight + 300;
  if (y > 0) {
    window.scrollTo(0, y);
  }
};
