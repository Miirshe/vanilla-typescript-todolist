import ListItem from './ListItem';

interface List {
	list : ListItem[],
	load(): void,
	save():void,
	addItem(objItem : ListItem) : void,
	clearList():void,
	removeItem(id :string):void
}

export default class FullList implements List{
	static instance: FullList = new FullList();
	private constructor( private _list : ListItem[] = []){}
	get list():ListItem[]{
		return this._list
	}

	save(): void {
		localStorage.setItem('mylist',JSON.stringify(this.list));
	}
	addItem(objItem: ListItem): void {
		this._list.push(objItem);
	}
	clearList(): void {
		this._list = [];
		this.save();
	}
	removeItem(id: string): void {
		const objList : ListItem[] = this._list.filter(data => {
			data.id != id;
		})
		this._list = objList;
		this.save();
	}


	load(): void {
		const storageList : string | null = localStorage.getItem('mylist');
		if( storageList != "string") return
		const parsedList : {_id :string , _item : string , _isChecked:boolean}[] = 
		JSON.parse(storageList);

		parsedList.forEach( items => {
			const newItem = new ListItem(items._id , items._item , items._isChecked);
			FullList.instance.addItem(newItem);
		})
	}
}
