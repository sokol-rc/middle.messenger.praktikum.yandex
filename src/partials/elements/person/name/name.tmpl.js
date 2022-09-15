import Handlebars from "handlebars";

const name = `
<div class="person-name">
	<span class="person-name__text">Дейв Черный</span>
</div>
`;

Handlebars.registerPartial('person-name', name);
