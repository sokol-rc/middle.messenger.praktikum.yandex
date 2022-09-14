export const chatPageTemplate = `
{{!> header}}
<main class="chat-page full-page">
	<nav class="nav-sidebar">
		<div class="nav-sidebar__inner nav-sidebar--bg-main">
			<div class="nav-sidebar__profile">
				<div class="profile-info">
					<div class="profile-info__avatar button-image" onclick ="sidebarRight.toogle(event,'chat-page__right-sidebar')">
						{{> avatar}}
					</div>
				</div>
			</div>
		</div>
	</nav>
	<section class="chat-page__list">
		{{> chat-list}}
	</section>
	<section class="chat-page__dialog">
		{{> dialog-window}}
	</section>
	<div class="chat-page__right-sidebar chat-page__right-sidebar--hidden right-sidebar">
		{{> right-sidebar}}
	</div>
</main>

{{!> footer}}
`;