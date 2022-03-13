import Notiflix from 'notiflix';
export const toast = {
  success() {
    Notiflix.Notify.success('Save post successfully', {
      timeout: 2000,
    });
  },

  error() {
    Notiflix.Notify.failure('Error', {
      timeout: 1500,
    });
  },

  remove() {
    Notiflix.Notify.success('Remove post successfully', {
      timeout: 2000,
    });
  },
};
