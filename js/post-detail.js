import { setTextContent, initLightBox } from './utils';
import postApi from './api/postApi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//format timestamp
dayjs.extend(relativeTime);

function renderPost(post) {
  if (!post) return;

  setTextContent(document, '#postDetailTitle', post.title);
  setTextContent(document, '#postDetailAuthor', post.author);
  setTextContent(document, '#postDetailTimeSpan', dayjs(post.updatedAt).format('DD-MM-YYYY'));
  setTextContent(document, '#postDetailDescription', post.description);

  const postBackground = document.getElementById('postHeroImage');
  if (postBackground) {
    postBackground.style.backgroundImage = `url(${post.imageUrl})`;
  }

  const editPage = document.getElementById('goToEditPageLink');
  if (editPage) {
    editPage.innerHTML = '<i class="fas fa-edit"></i>Edit Post';
    editPage.addEventListener('click', () => {
      window.location.assign(`/add-edit-post.html?id=${post.id}`);
    });
  }
}

(async () => {
  initLightBox();

  try {
    const loading = document.querySelector('#preloader');
    if (loading) {
      loading.setAttribute('hidden', '');
    }

    const queryParams = new URLSearchParams(window.location.search);
    const postId = queryParams.get('id');
    if (!postId) {
      console.log("can't not find id post");
    }

    const post = await postApi.getById(postId);
    renderPost(post);
  } catch (error) {
    console.log('failed to fetch API', error);
  }
})();
