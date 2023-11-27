import FullList from "../model/FullList";

interface DOMlist {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class TempleteList implements DOMlist {
  ul: HTMLUListElement;
  static instance: TempleteList = new TempleteList();
  private constructor() {
    this.ul = document.getElementById("listItem") as HTMLUListElement;
  }
  clear(): void {
    this.ul.innerHTML = "";
  }
  render(fullList: FullList): void {
    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      const inputCheckBox = document.createElement("input") as HTMLInputElement;
      const label = document.createElement("label") as HTMLLabelElement;
      const div = document.createElement("div") as HTMLDivElement;
      inputCheckBox.type = "checkbox";
      inputCheckBox.tabIndex = 0;
      inputCheckBox.id = item.id;
      inputCheckBox.checked = item.isChecked;
      div.append(inputCheckBox);
      inputCheckBox.addEventListener("change", () => {
        item.isChecked = !item.isChecked;
        if (item.isChecked) {
			label.classList.add("line-through");
        }else{
			label.classList.remove("line-through");
		}
		fullList.save();
      });
      inputCheckBox.className = "inputCheckBox";
      label.htmlFor = item.id;
      label.textContent = item.item;
      div.append(label);
      const btn = document.createElement("button") as HTMLButtonElement;
      btn.type = "button";
      btn.textContent = "X";
      li.className = "item";
      btn.className = "btnDelete";
      btn.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });
      div.className = "main";
      li.append(div);
      li.append(btn);
      this.ul.append(li);
    });
  }
}
