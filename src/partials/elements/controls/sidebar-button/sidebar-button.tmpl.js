import Handlebars from "handlebars";

const sidebarButton = `
<nav class="sidebar-button">
	<button class="sidebar-button__btn" onclick ="sidebarRight.toogle(event,'chat-page__right-sidebar')">
		<figure class="disk-menu-style"></figure>
		<figure class="disk-menu-style"></figure>
		<figure class="disk-menu-style"></figure>
	</button>
</nav>`;

Handlebars.registerPartial('sidebar-button', sidebarButton);