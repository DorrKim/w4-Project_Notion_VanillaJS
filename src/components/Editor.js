import { request } from '../api.js';

export default function Content({ $target, initialState }) {
  const $editor = document.createElement('section');
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = async nextState => {
    this.state = await request(`/documents/${nextState.id}`);
    this.render();
  };

  this.render = () => {
    $editor.innerHTML = `
    <input class="editor__title" type="text" name="title" placeholder="제목 없음" value="${this.state.title}"/>
    <div class="editor__content" contenteditable="true" name="content" data-placeholder="내용을 입력하세요">${this.state.content}</div>
    `;
  };

  this.render();
}
