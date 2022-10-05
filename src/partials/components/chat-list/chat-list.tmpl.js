import Handlebars from "handlebars";

const chatList = `
<div class="chat-list">
	<div class="chat-list__inner">
		<div class="chat-list__item hr-bottom">
			{{> chat-item}}
		</div>
		<div class="chat-list__item hr-bottom chat-list__item--active">
			{{> chat-item}}
		</div>
		<div class="chat-list__item hr-bottom">
			{{> chat-item}}
		</div>
		<div class="chat-list__item hr-bottom">
			{{> chat-item}}
		</div>
		<div class="chat-list__item hr-bottom">
			{{> chat-item}}
		</div>
		<div class="chat-list__item hr-bottom">
			{{> chat-item}}
		</div>
	</div>
</div>`;

Handlebars.registerPartial('chat-list', chatList);
