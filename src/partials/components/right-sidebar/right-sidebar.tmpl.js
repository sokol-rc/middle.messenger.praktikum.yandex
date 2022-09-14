import Handlebars from "handlebars";
import {sidebarRight} from "./right-sidebar.js";

const rightSidebarTemplate = `
<aside class="right-sidebar hr-left">
	<div class="right-sidebar__inner">
		<div class="chat-info">
			<div class="chat-info__description">
				{{>avatar}}
				{{>person-name}}
			</div>
			<div class="chat-info__control">
				<button class="chat-info__control-item chat-edit button-text">Редактировать</button>
				<button class="chat-info__control-item chat-delete button-text">Удалить чат</button>
			</div>
		</div>
	</div>
</aside>
`;
window.sidebarRight = sidebarRight;
Handlebars.registerPartial('right-sidebar', rightSidebarTemplate);