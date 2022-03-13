import debounce from 'lodash.debounce';

export function initSearch({ elementId, defaultParams, onChange }) {
  const searchInput = document.getElementById(elementId);
  if (!searchInput) return;

  if (defaultParams.get('title_like')) {
    searchInput.value = queryParams.get('title_like');
  }

  const debounceSearch = debounce((e) => onChange?.(e.target.value), 500);

  searchInput.addEventListener('input', debounceSearch);
}
