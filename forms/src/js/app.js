import Popover from './Popover';

const popoverContainer = document.querySelector('#test_button');

const popover = new Popover({
  container: popoverContainer,
  title: 'Test title',
  content: 'Amazing test content in popover based on JS!',
});
popover.init();

popoverContainer.addEventListener('click', () => popover.toggle());
