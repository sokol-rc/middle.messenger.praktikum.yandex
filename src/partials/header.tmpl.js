import Handlebars from "handlebars"

const template = `
<style>
	.dev-link + .dev-link {
		margin-left: 10px;
	}
	.dev-link {
		color: revert;
	}
</style>
<header class="header">
	<h1>DEV header for links</h1>
	<a class="dev-link" href="/" >Main</a>
	<a class="dev-link" href="login.html" >Login</a>
	<a class="dev-link" href="registration.html" >registration</a>
</header>`

Handlebars.registerPartial('header', template);