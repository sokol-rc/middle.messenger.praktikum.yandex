/* eslint-disable */
import Block from 'core/Block';
import './modal-confirm.css';

export class ModalConfirm extends Block {
    static componentName: string = 'ModalConfirm';
    render() {
        return `<div class="modal modal-confirm modal--hidden">
		<div class="modal__shadow"></div>
		<div class="modal__inner">
			<div class="modal__window ">
				<div class="modal__title">Удалить чат?</div>
				<div class="modal__control">
					<button class="modal__yes modal__button" onclick="window.modalConfirm.close()">Да</button>
					<button class="modal__no modal__button" onclick="window.modalConfirm.close()">Нет</button>
				</div>
	
			</div>
		</div>
	
	</div>`;
    }
}
