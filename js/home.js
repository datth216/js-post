import postApi from './api/postApi';
import { renderPostList, renderPagination, initPagination, initSearch, toast } from './utils';

async function handleFilterChange(filterName, filterValue) {
  try {
    const url = new URL(window.location);

    if (filterName) url.searchParams.set(filterName, filterValue);

    // set default page to 1 when searching
    if (filterName === 'title_like') url.searchParams.set('_page', 1);

    history.pushState({}, '', url);

    const { data, pagination } = await postApi.getAll(url.searchParams);
    renderPostList('postList', data);
    renderPagination('postPagination', pagination);
  } catch (error) {
    console.log('Error to fetch Api: ', error);
  }
}

function initDeletePost() {
  document.addEventListener('remove-post', async (event) => {
    try {
      const post = event.detail;
      await postApi.remove(post.id);
      toast.remove();
      await handleFilterChange();
    } catch (error) {
      // console.log('Error to remove post', error);
      // toast.error();
    }
  });
}

(async () => {
  try {
    const url = new URL(window.location);

    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

    history.pushState({}, '', url);
    const queryParams = url.searchParams;

    initPagination({
      elementId: 'postPagination',
      defaultParams: queryParams,
      onChange: (page) => handleFilterChange('_page', page),
    });

    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('title_like', value),
    });

    initDeletePost();

    const { data, pagination } = await postApi.getAll(queryParams);
    renderPostList('postList', data);
    renderPagination('postPagination', pagination);

    const loading = document.querySelector('#preloader');
    if (loading) {
      loading.setAttribute('hidden', '');
    }
  } catch (error) {
    console.error(error);
  }
})();
