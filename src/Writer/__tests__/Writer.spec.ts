import Writer from '../Writer';

describe('Writer test', () => {
	let w: Writer;
	beforeEach(() => {
		w = new Writer();
	});

	describe('addLetter', () => {
		it('should be able to add a single letter', () => {
			w.addLetter('a');
			expect(w.letters).toBe('a');
		});
		it('throws an error if you try to add more or less than a single letter', () => {
			expect(() => {
				w.addLetter('ab');
			}).toThrow();

			expect(() => {
				w.addLetter('');
			}).toThrow();

			expect(() => {
				// @ts-expect-error test
				w.addLetter(null);
			});
		});
	});

	describe('removeLetter', () => {
		it('should erase a letter when called', () => {
			w.addLetter('a');
			w.removeLetter();
			expect(w.letters).toBe('');
		});
		it('should work if there is no letter', () => {
			w.removeLetter();
			expect(w.letters).toBe('');
		});
	});

	describe('lineBreak', () => {
		it('is possible to add linebreaks', () => {
			w.lineBreak();
			expect(w.letters).toBe('\n');
		});
	});

	describe('selectAll', () => {
		it('selects all things', () => {
			w.selectAll();
			expect(w.allSelected).toBe(true);
		});
	});

	describe('toggleSelectAll', () => {
		it('selects and unselects', () => {
			w.toggleSelectAll();
			expect(w.allSelected).toBe(true);
			w.toggleSelectAll();
			expect(w.allSelected).toBe(false);
			w.toggleSelectAll();
			expect(w.allSelected).toBe(true);
		});
	});

	describe('removeAll', () => {
		it('erases all the text', () => {
			w.addLetter('a');
			w.addLetter('b');
			w.addLetter('c');
			w.removeAll();
			expect(w.letters).toBe('');
		});
	});

	describe('history', () => {
		it('keeps track of states', () => {
			w.addLetter('a');
			expect(w.history).toEqual(['']);
			w.addLetter('b');
			expect(w.history).toEqual(['', 'a']);
			w.addLetter('c');
			expect(w.history).toEqual(['', 'a', 'ab']);
			w.removeLetter();
			expect(w.history).toEqual(['', 'a', 'ab', 'abc']);
		});
	});

	describe('goBack', () => {
		it('goes back in history', () => {
			w.addLetter('a');
			w.goBack();
			expect(w.letters).toBe('');
		});
	});

	describe('onChange', () => {
		it('takes an optional callback', () => {
			const spy = jest.spyOn(console, 'log');
			w.onChange(console.log);

			w.addLetter('h');
			expect(spy).toHaveBeenCalledWith({
				type: 'write',
				target: 'h',
				letters: 'h',
			});

			w.addLetter('e');
			expect(spy).toHaveBeenCalledWith({
				type: 'write',
				target: 'e',
				letters: 'he',
			});

			w.addLetter('l');
			w.addLetter('l');
			w.addLetter('o');

			expect(spy).toHaveBeenCalledWith({
				type: 'write',
				target: 'o',
				letters: 'hello',
			});

			w.removeLetter();
			expect(spy).toHaveBeenCalledWith({
				type: 'delete',
				target: null,
				letters: 'hell',
			});
		});
	});
});
