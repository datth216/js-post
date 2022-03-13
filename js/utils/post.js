import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//format timestamp
dayjs.extend(relativeTime);

export function createPostElement(post) {
  if (!post) return;

  const postTemplate = document.getElementById('postTemplate');
  if (!postTemplate) return;

  const liElement = postTemplate.content.firstElementChild.cloneNode(true);
  if (!liElement) return;

  // update title, content,...
  const titleElemenent = liElement.querySelector('[data-id="title"]');
  titleElemenent.textContent = post.title;

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]');
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl;

    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = '././images/placeholder.png';
    });
  }

  const descriptionElement = liElement.querySelector('[data-id="description"]');
  descriptionElement.textContent = post.description;

  const authorElement = liElement.querySelector('[data-id="author"]');
  authorElement.textContent = post.author;

  const timeSpanElement = liElement.querySelector('[data-id="timeSpan"]');
  timeSpanElement.textContent = dayjs(post.updatedAt).fromNow();

  // attach event - post detail
  const postDetail = liElement.firstElementChild;
  const menu = liElement.querySelector('[data-id="menu"]');

  if (postDetail) {
    postDetail.addEventListener('click', (event) => {
      if (menu && menu.contains(event.target)) return;
      window.location.assign(`/post-detail.html?id=${post.id}`);
    });
  }

  const editButton = liElement.querySelector('[data-id="edit"]');
  if (editButton) {
    editButton.addEventListener('click', () => {
      window.location.assign(`/add-edit-post.html?id=${post.id}`);
    });
  }

  const removeButton = liElement.querySelector('[data-id="remove"]');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      const customEvent = new CustomEvent('remove-post', {
        bubbles: true,
        detail: post,
      });

      removeButton.dispatchEvent(customEvent);
    });
  }

  return liElement;
}

export function renderPostList(elementId, postList) {
  if (!Array.isArray(postList)) return;

  const ulElement = document.getElementById(elementId);
  if (!ulElement) return;

  //clear current list
  ulElement.textContent = '';

  postList.forEach((post) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}
