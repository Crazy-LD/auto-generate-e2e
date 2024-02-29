export class JavaScriptFormatter {
  private _baseIndent: string;
  private _baseOffset: string;
  private _lines: string[] = [];

  constructor(offset = 0) {
    this._baseIndent = ' '.repeat(2);
    this._baseOffset = ' '.repeat(offset);
  }

  prepend(text: string) {
    this._lines = text.trim().split('\n').map(line => line.trim()).concat(this._lines);
  }

  add(text: string) {
    this._lines.push(...text.trim().split('\n').map(line => line.trim()));
  }

  newLine() {
    this._lines.push('');
  }

  format(): string {
    let spaces = '';
    let previousLine = '';
    return this._lines.map((line: string) => {
      if (line === '')
        return line;
      if (line.startsWith('}') || line.startsWith(']'))
        spaces = spaces.substring(this._baseIndent.length);

      const extraSpaces = /^(for|while|if|try).*\(.*\)$/.test(previousLine) ? this._baseIndent : '';
      previousLine = line;

      const callCarryOver = line.startsWith('.set');
      line = spaces + extraSpaces + (callCarryOver ? this._baseIndent : '') + line;
      if (line.endsWith('{') || line.endsWith('['))
        spaces += this._baseIndent;
      return this._baseOffset + line;
    }).join('\n');
  }
}

