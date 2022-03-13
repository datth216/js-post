import { randomNumber, setBackgroundImage, setFieldValue, setTextContent } from './common';
import * as yup from 'yup';

function setFormValue(form, defaultValue) {
  if (!form) return;
  setFieldValue(form, '[name="title"]', defaultValue?.title);
  setFieldValue(form, '[name="author"]', defaultValue?.author);
  setFieldValue(form, '[name="description"]', defaultValue?.description);

  setFieldValue(form, '[name="imageUrl"]', defaultValue?.imageUrl);
  setBackgroundImage(document, '#postHeroImage', defaultValue?.imageUrl);
}

function getPostSchema() {
  return yup.object().shape({
    title: yup.string().required('Please enter title !'),
    author: yup.string().required('Please enter author !'),
    description: yup.string(),
    imageUrl: yup.string().required('Please random image !').url('Please enter image url'),
  });
}

function setFieldError(form, name, error) {
  const element = form.querySelector(`[name="${name}"]`);
  if (element) {
    element.setCustomValidity(error);
    setTextContent(element.parentElement, '.invalid-feedback', error);
  }
}

async function validateFormValue(form, formValues) {
  try {
    //reset errors
    ['title', 'author', 'imageUrl'].forEach((name) => setFieldError(form, name, ''));

    //validation
    const schema = getPostSchema();
    await schema.validate(formValues, { abortEarly: false });
  } catch (error) {
    for (const validationError of error.inner) {
      const name = validationError.path;
      setFieldError(form, name, validationError.message);
    }
  }

  const hasValid = form.checkValidity();
  if (!hasValid) form.classList.add('was-validated');

  return hasValid;
}

function getFormValue(form) {
  const formValue = {};

  const data = new FormData(form);
  for (const [key, value] of data) {
    formValue[key] = value;
  }

  return formValue;
}

function initRandomImage(form) {
  const randomButton = document.getElementById('postChangeImage');
  if (!randomButton) return;

  randomButton.addEventListener('click', () => {
    const imageUrl = `https://picsum.photos/id/${randomNumber(1000)}/1368/400`;

    setFieldValue(form, '[name="imageUrl"]', imageUrl);
    setBackgroundImage(document, '#postHeroImage', imageUrl);
  });
}

export function initPostForm({ formId, defaultValue, onSubmit }) {
  const form = document.getElementById(formId);
  if (!form) return;

  setFormValue(form, defaultValue);
  initRandomImage(form);

  //submit 1 time
  let flag = false;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (flag) return;

    const formValues = getFormValue(form);
    formValues.id = defaultValue.id;

    const isValid = await validateFormValue(form, formValues);
    if (!isValid) return;
    await onSubmit?.(formValues);

    flag = true;
  });
}
