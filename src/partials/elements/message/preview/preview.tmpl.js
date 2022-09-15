import Handlebars from "handlebars";

const preview = `
<div class="message-preview">
	<span class="message-preview__text">Привет! я тут погляжу ты чат рисуешь. А вот внизу там
		криво, и контраст местами такой...</span>
</div>
`;

Handlebars.registerPartial('message-preview', preview);
