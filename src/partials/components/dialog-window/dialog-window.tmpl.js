import Handlebars from "handlebars";
import * as sendIcon from '../../../assets/send.svg';

const dialogWindow = `
<div class="dialog-window">
	<div class="dialog-window__inner">
		<div class="dialog-window__header dialog-header hr-bottom">
			<div class="dialog-header__profile">
				<div class="profile-info">
					<div class="profile-info__avatar">
						{{> avatar}}
					</div>
					<div class="profile-info__title">
						{{> person-name}}
						<span class="profile-info__status profile-status">Онлайн</span>
					</div>
				</div>
			</div>
		</div>
		<div class="dialog-window__body dialog-window__body--bg-dialog hr-bottom">
			<div class="dialog-scrollable-content">
				<div class="bubbles-day-section">
					<div class="bubbles-group">
						<div class="bubble bubble-in">
							<div class="bubble__inner">
								<div class="bubble__text">Первое сообщение</div>
								<div class="bubble__time"></div>
								<svg class="bubble__tail-in" width="20" height="13" viewBox="0 0 20 13" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M0 13H19.9554C18.53 13 12.899 -7.31267 9.265 2.84388C5.63095 13.0004 0.625661 12.4839 0 13Z" />
								</svg>

							</div>
						</div>
					</div>
					<div class="bubbles-group">
						<div class="bubble bubble-out">
							<div class="bubble__inner">
								<div class="bubble__text">Второе сообщение очень огромное просто ппц какое большое что же делать с таким не знаю прям целый абзц вот наврено еще надо немного написать а то тут странно как-то</div>
								<div class="bubble__time"></div>
								<svg class="bubble__tail-out" width="20" height="13" viewBox="0 0 20 13" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M20 13H0.0446164C1.47 13 7.10095 -7.31267 10.735 2.84388C14.369 13.0004 19.3743 12.4839 20 13Z" />
								</svg>

							</div>
						</div>
					</div>
					<div class="bubbles-group">
						<div class="bubble bubble-out">
							<div class="bubble__inner">
								<div class="bubble__text">Второе сообщение</div>
								<div class="bubble__time"></div>
								<svg class="bubble__tail-out" width="20" height="13" viewBox="0 0 20 13" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M20 13H0.0446164C1.47 13 7.10095 -7.31267 10.735 2.84388C14.369 13.0004 19.3743 12.4839 20 13Z" />
								</svg>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="dialog-window__controls">
			<div class="message-send">
				<form class="send-form" action="">
					<div class="send-form__input-group send-form-input">
						<label class="send-form-input__label visually-hidden" for="messageSend">Напишите здесь</label>
						<input class="send-form-input__input" id="messageSend" type="text"
							placeholder="Напишите здесь...">
					</div>
					<div class="send-form__submit">
						<div class="send-message-control">
							<button class="send-message-btn">
								<span class="send-icon"><img src="${sendIcon}" alt=""></span>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
`;

Handlebars.registerPartial('dialog-window', dialogWindow);