export default function Content({ $target }) {
  const $editor = document.createElement('section');
  $target.appendChild($editor);

  this.render = () => {
    $editor.innerHTML = `
    <input class="editor__title" type="text" name="title" placeholder="제목 없음" value=""/>
    <div class="editor__content" contenteditable="true" name="content" data-placeholder="내용을 입력하세요"></div>
    `;
  };

  this.render();
}
