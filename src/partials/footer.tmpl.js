import Handlebars from "handlebars";
const template = `
<footer class="footer">
	это футер
</footer>
`
Handlebars.registerPartial('footer', template);