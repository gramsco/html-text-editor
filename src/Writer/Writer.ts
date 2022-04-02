interface CallBackConfig {
	type: 'write' | 'delete' | 'select' | 'cancel';
	target: null | string;
}

interface CallBackConfigWithLetters extends CallBackConfig {
	letters: string;
}

class Writer {
	letters: string;
	allSelected: boolean;
	history: string[];

	private onChangeCallBack:
		| ((config: CallBackConfigWithLetters) => void)
		| null;

	constructor() {
		this.letters = '';
		this.allSelected = false;
		this.onChangeCallBack = null;
		this.history = [];
	}

	callBack(config: CallBackConfig) {
		if (this.onChangeCallBack) {
			this.onChangeCallBack({
				...config,
				letters: this.letters,
			});
		}
	}

	pushToHistory() {
		this.history.push(this.letters);
	}

	goBack() {
		const previousState = this.history.pop();
		if (typeof previousState !== 'undefined') {
			console.log({ previousState });
			this.letters = previousState;
			this.callBack({
				type: 'cancel',
				target: null,
			});
		}
	}

	addLetter(letter: string): void {
		if (letter.length !== 1) throw new Error('Not a single letter');
		if (this.allSelected) {
			this.pushToHistory();
			this.letters = letter;
			this.callBack({
				type: 'write',
				target: letter,
			});
			this.toggleSelectAll();
		} else {
			this.pushToHistory();
			this.letters += letter;
			this.callBack({
				type: 'write',
				target: letter,
			});
		}
	}

	removeLetter(): void {
		this.pushToHistory();
		this.letters = this.letters.slice(0, -1);
		this.callBack({
			type: 'delete',
			target: null,
		});
	}

	lineBreak(): void {
		this.letters = this.letters += '\n';
		this.callBack({
			type: 'write',
			target: '\n',
		});
	}

	onChange(cbk: (config: CallBackConfigWithLetters) => void): void {
		this.onChangeCallBack = cbk;
	}

	toggleSelectAll() {
		this.allSelected = !this.allSelected;
		this.callBack({
			type: 'select',
			target: this.letters,
		});
	}

	selectAll() {
		this.allSelected = true;
		this.callBack({
			type: 'select',
			target: this.letters,
		});
	}

	removeAll() {
		this.pushToHistory();
		this.letters = '';
		this.allSelected = false;
		this.callBack({
			type: 'delete',
			target: this.letters,
		});
	}
}

export default Writer;
