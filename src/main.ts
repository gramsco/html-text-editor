import Renderer from './Renderer/Renderer';

function main() {
	const mainElement = document.querySelector('main');
	if (!mainElement) throw new Error('');
	const renderer = new Renderer(mainElement, 'OFF');
	const button = document.querySelector('button');
	if (button) {
		button.onclick = () => {
			renderer.writer.toggleSelectAll();
		};
	}

	function sayThings(str: string, intervalInMs: number = 100): Promise<null> {
		return new Promise(res => {
			let array = str.split('');
			let id = setInterval(() => {
				if (array.length === 0) {
					clearInterval(id);
					renderer.writer.lineBreak();
					res(null);
				}
				let letter = array.shift();
				renderer.writer.addLetter(letter as string);
			}, intervalInMs);
		});
	}

	const s1 = () => sayThings('Hi there ');
	const s2 = () => sayThings('woow ', 100);
	const s3 = () => sayThings('This is crazy ?? ', 50);
	const s4 = () => sayThings('... stupid but crazy', 0);
	const s5 = () => sayThings('');
	const s6 = () => sayThings('Now, you plda.');

	s1()
		.then(s2)
		.then(s3)
		.then(s4)
		.then(s5)
		.then(s6)
		.then(() => {
			renderer.writer.removeLetter();
			renderer.writer.removeLetter();
			renderer.writer.removeLetter();
			renderer.writer.removeLetter();
			sayThings('ay !', 200).then(() => {
				renderer.toggleState();
			});
		});
}

main();
