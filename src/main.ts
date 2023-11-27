import './style.css'
import FullList from './model/FullList'
import TempleteList from './templetes/TempleteList';
import Items from './model/ListItem';
function initApp():void{
  const fullList = FullList.instance;
  const templeteList = TempleteList.instance;

  const form = document.getElementById('form') as HTMLFormElement;
  form.addEventListener('submit', (Event : SubmitEvent):void =>{
    Event.preventDefault();
    const input = document.getElementById('item') as HTMLInputElement;
    const inputValue : string = input.value.trim();
    if(!inputValue.length) return 
    const itemId : number = fullList.list.length ? 
    parseInt(fullList.list[fullList.list.length -1].id)
    : 1;

    const check : boolean = false;
    const item = new Items(itemId.toString(),inputValue , check);
    fullList.addItem(item);
    templeteList.render(fullList);
  })

  const btnClear = document.getElementById('btnClear') as HTMLButtonElement;
  btnClear.addEventListener('click',() => {
    fullList.clearList();
    templeteList.clear();
  })
  templeteList.render(fullList);
  fullList.load();

}

document.addEventListener('DOMContentLoaded',initApp);