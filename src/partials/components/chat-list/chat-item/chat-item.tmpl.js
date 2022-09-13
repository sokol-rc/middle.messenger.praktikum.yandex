import Handlebars from "handlebars";

const chatItemComponent = `
<div class="chat-preview">
	<div class="chat-preview__avatar">
		{{> avatar}}
	</div>
	<div class="chat-preview__body">
		<div class="chat-preview__title">
			{{> person-name}}
			<span class="time__text chat-preview-info">14:45</span>
		</div>
		<div class="chat-preview__message">
			{{> message-preview}}
			<span class="message-preview__unread-label chat-preview-info">1</span>
		</div>
	</div>
</div>`;

Handlebars.registerPartial('chat-item', chatItemComponent);