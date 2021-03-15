export const onClickNG = () => {
  const t = document.getElementById("textarea") as HTMLTextAreaElement;
  const start = t.selectionStart;
  const end = t.selectionEnd;
  t.value = t.value.substring(0, start) + "🙁" + t.value.substring(end);
  t.focus();
};

export const onClickGood = () => {
  const t = document.getElementById("textarea") as HTMLTextAreaElement;
  const start = t.selectionStart;
  const end = t.selectionEnd;
  t.value = t.value.substring(0, start) + "🙂" + t.value.substring(end);
  t.focus();
};
