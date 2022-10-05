import Block from 'core/Block';
import './modal-confirm.css';

interface Props {
    label: string;
    description: string;
    isVisible: boolean;
    onConfirm: () => void;
    onDecline: () => void;
}

export default class ModalConfirm extends Block<Props> {
	
    onConfirm() {
        this.props.onConfirm();
    }

    onDecline() {
        this.props.onDecline();
    }

    static componentName: string = 'ModalConfirm';

    render() {
        let classVisible: string = '';
        if (this.props.isVisible) {
            classVisible = 'modal--opened';
        }

        return `<div class="modal modal-confirm ${classVisible}">
		<div class="modal__shadow"></div>
		<div class="modal__inner">
			<div class="modal__window ">
				<div class="modal__title">{{label}}</div>
				<div class="modal__description">{{description}}</div>
				<div class="modal__control">
				{{{Button 
					label="Да" 
					className="modal__yes modal__button" 
					onClick=onConfirm
				}}}
				{{{Button 
					label="Нет" 
					className="modal__no modal__button" 
					onClick=onDecline
				}}}
				</div>
			</div>
		</div>
	</div>`;
    }
}
