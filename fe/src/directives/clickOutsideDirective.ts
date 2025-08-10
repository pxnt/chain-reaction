import type { DirectiveBinding } from 'vue';

interface ClickOutsideElement extends HTMLElement {
  __outsideClickHandler__: any,
}

const clickOutsidePlugin = {
  beforeMount(el: ClickOutsideElement, binding: DirectiveBinding<any>) {
    const outsideClickHandler = (event: MouseEvent) => {
      // @ts-expect-error: Event target missing props
      if (!el.contains(event.target) && el !== event.target) {
        binding.value(event);
      }
    };

    el.__outsideClickHandler__ = outsideClickHandler;
    document.addEventListener('click', outsideClickHandler);
  },
  beforeUnmount(el: ClickOutsideElement) {
    document.removeEventListener('click', el.__outsideClickHandler__);
  },
};

export default clickOutsidePlugin;
