import Handlebars from "handlebars";
import * as sendIcon from '../../../assets/send.svg';

const dialogWindow = `
<div class="dialog-window">
	<div class="dialog-window__inner">
		<div class="dialog-window__header dialog-header hr-bottom">
			<div class="dialog-header__profile hr-left">
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
			<div class="dialog-header__control">
				{{> sidebar-button}}
			</div>
		</div>
		<div class="dialog-window__body dialog-window__body--bg-dialog hr-bottom">
			<div class="dialog-scrollable-content">
				<div class="bubbles-day-section">
					<div class="bubbles-group">
						<div class="bubble bubble-in">
							<div class="bubble__inner">
								<div class="bubble__text">Первое сообщение
									<span class="bubble__time time">
										<span
											class="time__inner time__inner--font-size-s time__inner--font-style-italic">14:40</span>
									</span>
								</div>
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
								<div class="bubble__text">Второе сообщение очень огромное просто ппц какое большое что
									же делать с таким не знаю прям целый абзц вот наврено еще надо немного написать а то
									тут странно как-то
									<span class="bubble__time time">
										<span
											class="time__inner time__inner--font-size-s time__inner--font-style-italic">14:40</span>
										<svg class="bubble__sending-status sending-status readed"width="24" height="14" viewBox="0 0 24 14" fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M0.741699 7.9467L6.3317 13.5367L7.7417 12.1167L2.1617 6.5367M22.5717 0.116699L11.9917 10.7067L7.8317 6.5367L6.4017 7.9467L11.9917 13.5367L23.9917 1.5367M18.3317 1.5367L16.9217 0.116699L10.5717 6.4667L11.9917 7.8767L18.3317 1.5367Z" />
										</svg>

									</span>
								</div>

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
								<div class="bubble__text">Второе сообщение
									<span class="bubble__time time">
										<span
											class="time__inner time__inner--font-size-s time__inner--font-style-italic">14:40</span>
										<svg class="bubble__sending-status sending-status received" width="18"
											height="14" viewBox="0 0 18 14" fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M18 2.00009L6 14.0001L0.5 8.50009L1.91 7.09009L6 11.1701L16.59 0.590088L18 2.00009Z"/>
										</svg>

									</span>
								</div>

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
		<div class="dialog-window__controls hr-left">
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