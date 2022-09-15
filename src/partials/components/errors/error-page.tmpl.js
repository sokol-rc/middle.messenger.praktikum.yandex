import Handlebars from "handlebars";

const errorPageTemplate = `
	<div class="error-page">
		<div class="error-page__text error-page__text--error-style">
			{{value}}
		</div>
	</div>
`;

Handlebars.registerPartial('error-page', errorPageTemplate);
