export function initLightBox() {
  let imageList = [];
  let srcImage = '';

  function showImageAtIndex(index, imageList) {
    return (srcImage = imageList[index].src);
  }

  document.addEventListener('click', function (event) {
    const { target } = event;

    if (target.tagName !== 'IMG' || !target.dataset.gallery) return;

    imageList = document.querySelectorAll(`[data-gallery=${event.target.dataset.gallery}]`);

    let index = [...imageList].findIndex((x) => x === target);

    const template = `<div class="lightbox">
      <div class="lightbox-content">
      <i class="fas fa-chevron-left prevButton"></i>
        <img src="${showImageAtIndex(index, imageList)}" alt="" class="lightbox-image" />
        <i class="fas fa-chevron-right nextButton"></i>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', template);

    //remove image when click outsite
    document.body.addEventListener('click', (event) => {
      if (event.target.matches('.lightbox')) {
        event.target.parentNode?.removeChild(event.target);
      }
    });

    //handle prev button
    const prevButton = document.querySelector('.prevButton');
    if (!prevButton) return;

    prevButton.addEventListener('click', () => {
      const srcNewLightbox = document.querySelector('.lightbox-image');
      if (!srcNewLightbox) return;

      index = (index - 1 + imageList.length) % imageList.length;
      srcNewLightbox.setAttribute('src', showImageAtIndex(index, imageList));
    });

    // handle next button
    const nextButton = document.querySelector('.nextButton');
    if (!nextButton) return;

    nextButton.addEventListener('click', () => {
      const srcNewLightbox = document.querySelector('.lightbox-image');
      if (!srcNewLightbox) return;

      index = (index + 1) % imageList.length;
      srcNewLightbox.setAttribute('src', showImageAtIndex(index, imageList));
    });
  });
}
