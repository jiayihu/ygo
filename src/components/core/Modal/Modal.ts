import { BoundTemplateFunction } from 'hyperhtml';
import HyperHTMLElement from 'hyperhtml-element';
import style from './Modal.css';
import MicroModal from 'micromodal';

let id = 0;

const { bind } = HyperHTMLElement;

export class Modal extends HyperHTMLElement {
  static get booleanAttributes() {
    return ['open'];
  }

  static get observedAttributes() {
    return ['name'];
  }

  private modalId = `modal-${id++}`;
  private htmlPortal: BoundTemplateFunction<Element>;

  data?: HTMLElement;
  open: boolean = false;
  name?: string;

  constructor() {
    super();

    const portalEl = document.querySelector('ygo-portal')!;
    this.htmlPortal = bind(portalEl);
  }

  attributeChangedCallback(attr: string, prev: string, curr: string) {
    this.render();

    if (attr === 'open' && this.isConnected) {
      this.toggleModal();
    }
  }

  connectedCallback() {
    this.render();
    this.toggleModal();
  }

  handleClose(modal: any) {
    if (modal.id === this.modalId) {
      const event = new CustomEvent<null>('close');
      this.dispatchEvent(event);
    }
  }

  toggleModal() {
    const config = {
      onClose: this.handleClose
    };
    this.open ? MicroModal.show(this.modalId, config) : MicroModal.close(this.modalId);
  }

  render() {
    if (!this.name) return this.html`No modal name`;

    return this.htmlPortal`
      <style>${style}</style>
      <div class="modal micromodal-slide" id=${this.modalId} aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close>
          <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby=${`${
            this.modalId
          }-title`}>
            <header class="modal__header">
              <h2 class="modal__title" id=${`${this.modalId}-title`}>
                ${this.name}
              </h2>
              <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
            </header>
            <main class="modal__content" id=${`${this.modalId}-content`}>
              ${this.data}
            </main>
            <footer class="modal__footer">
              <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
            </footer>
          </div>
        </div>
      </div>
    `;
  }
}

Modal.define('ygo-modal');
