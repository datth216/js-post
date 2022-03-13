export function setTextContent(parent, selector, text) {
  if (!parent) return;

  const element = parent.querySelector(selector);
  if (element) element.textContent = text;
}

export function setFieldValue(form, selector, value) {
  if (!form) return;

  const element = form.querySelector(selector);
  if (element) element.value = value;
}

export function setBackgroundImage(parent, selector, imageUrl) {
  if (!parent) return;

  const element = parent.querySelector(selector);
  if (element) element.style.backgroundImage = `url(${imageUrl})`;
}

export function randomNumber(n) {
  if (n <= 0) return -1;
  return Math.round(Math.random() * n);
}
