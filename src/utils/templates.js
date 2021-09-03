import { fillListItem } from './render.js';

function $createElement(element, ...option) {
	const $element = document.createElement(element);

	if (option.length) {
		option.forEach(option => {
			const optionName = option.substring(1);

			switch (option[0]) {
				case '#':
					$element.setAttribute('id', optionName);
					break;
				default:
					$element.classList.add(optionName);
			}
		});
	}

	return $element;
}

const $blankItem = () => {
	const $blank = $createElement('p', '.blank');

	$blank.setAttribute('datat-id', 'blank');
	$blank.classList.add('hide');
	$blank.textContent = '하위 페이지가 없습니다.';

	return $blank;
};

const $treeItem = () => {
	const $tree = $createElement('ul', '.tree', '.hide');
	return $tree;
};

const $listItem = () => {
	const $li = $createElement('li');

	$li.innerHTML = `
			<p class="nav-item demo-icon">
				<span class="item-container"></span>
				<button class="nav-toggler-btn icon-play"></button>
				<span class="nav-page-title"></span>
				<button class="nav-delete-btn icon-trash-empty"> </button>
				<button class="nav-crate-btn icon-plus-squared-alt" data-target="modal"></button>
			</p> `;

	return $li;
};

const $newPostListItem = () => {
	const $newLi = $listItem();

	const $filledLi = fillListItem($newLi, {
		id: 'new',
		title: '제목없음',
		isOpened: null,
	});
	const $blank = $blankItem();
	$filledLi.appendChild($blank);

	return $filledLi;
};

export { $createElement, $treeItem, $listItem, $blankItem, $newPostListItem };
