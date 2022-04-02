import Writer from '../Writer/Writer';

const ON = 'ON';
const OFF = 'OFF';

type OnOff = typeof ON | typeof OFF;

function toggleState(state: OnOff): OnOff {
	return state === 'ON' ? 'OFF' : 'ON';
}

class Renderer {
	element: HTMLElement;
	writer: Writer;
	metaClicked: boolean;
	state: OnOff;
	constructor(element: HTMLElement, state = ON as OnOff) {
		this.state = state;
		this.element = element;
		this.writer = new Writer();
		this.metaClicked = false;
		this.writer.onChange(config => {
			this.element.innerHTML = config.letters;
			if (this.writer.allSelected) {
				this.element.classList.add('select-all');
			} else {
				this.element.classList.remove('select-all');
			}
		});

		window.addEventListener('keyup', e => {
			console.log('ouh');
			if (e.key === 'Meta') this.metaClicked = false;
		});

		window.addEventListener('keydown', e => {
			console.log(e.key);
			switch (e.key) {
				case 'Meta':
					this.metaClicked = true;
					break;

				case 'Enter':
					this.writer.lineBreak();
					break;
				case 'Backspace':
					if (this.writer.allSelected) {
						console.log('YES');
						this.writer.removeAll();
					} else {
						console.log('OH NO');
						this.writer.removeLetter();
					}
					break;

				case 'a':
					if (this.metaClicked) {
						this.writer.toggleSelectAll();
						break;
					}

				case 'z':
					if (this.metaClicked) {
						console.log(this.writer.history);
						this.writer.goBack();
						break;
					}

				default:
					console.log(e.key);
					this.writer.addLetter(e.key);
					break;
			}
			e.preventDefault();
		});
	}

	toggleState() {
		this.state = toggleState(this.state);
	}
}

export default Renderer;
