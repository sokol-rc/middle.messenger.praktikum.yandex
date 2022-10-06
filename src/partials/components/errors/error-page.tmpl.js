import Handlebars from "handlebars";

const errorPageTemplate = `
<div class="error-page">
	<div class="error-page__text error-page__text--error-style">
		{{value}}
	</div>
	<div class="error-page__return">
		<div class="return-button">
			<button class="return-button__btn btn--submit-style btn" onclick="window.history.back()">Вернуться</button>
		</div>
	</div>

</div>
`;

Handlebars.registerPartial('error-page', errorPageTemplate);
