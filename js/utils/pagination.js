export function initPagination({ elementId, defaultParams, onChange }) {
  const ulPagination = document.getElementById(elementId);
  if (!ulPagination) return;

  const prevPaginationButton = ulPagination.firstElementChild?.firstElementChild;
  if (prevPaginationButton)
    prevPaginationButton.addEventListener('click', (e) => {
      e.preventDefault();

      const currentPage = Number.parseInt(ulPagination.dataset.page) || 1;
      if (currentPage <= 1) return;

      onChange?.(currentPage - 1);
    });

  const nextPaginationButton = ulPagination.lastElementChild.lastElementChild;
  if (nextPaginationButton)
    nextPaginationButton.addEventListener('click', (e) => {
      e.preventDefault();

      const totalPages = ulPagination.dataset.totalPages;

      const currentPage = Number.parseInt(ulPagination.dataset.page);
      if (currentPage >= totalPages) return;
      onChange?.(currentPage + 1);
    });
}

export function renderPagination(elementId, pagination) {
  const ulPagination = document.getElementById(elementId);
  if (!ulPagination) return;

  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  ulPagination.dataset.page = _page;
  ulPagination.dataset.totalPages = totalPages;

  if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled');
  else ulPagination.firstElementChild?.classList.remove('disabled');

  if (_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled');
  else ulPagination.lastElementChild?.classList.remove('disabled');
}
