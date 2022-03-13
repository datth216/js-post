import postApi from './api/postApi';
import { initPostForm, toast } from './utils';

async function handleFormSubmit(formValues) {
  try {
    //based on id to add or edit page
    const savedId = formValues.id
      ? await postApi.update(formValues)
      : await postApi.add(formValues);

    toast.success();

    setTimeout(() => {
      window.location.assign(`/post-detail.html?id=${savedId.id}`);
    }, 2000);
  } catch (error) {
    console.error(error);
    toast.error();
  }
}

(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    let defaultValue = Boolean(postId)
      ? await postApi.getById(postId)
      : {
          title: '',
          author: '',
          description: '',
          imageUrl: '',
        };

    initPostForm({
      formId: 'postForm',
      defaultValue,
      onSubmit: handleFormSubmit,
    });
  } catch (error) {
    console.error('failed to fetch API', error);
  }
})();
