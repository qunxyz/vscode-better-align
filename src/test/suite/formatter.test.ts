import * as assert from 'assert';
import * as vscode from 'vscode';
import { Formatter, LineRange } from '../../formatter';

class FakeFormatter extends Formatter {
    public format(range: LineRange): string[] {
        return super.format(range);
    }

    public getLineRanges(editor: vscode.TextEditor) {
        super.editor = editor;
        return super.getLineRanges(editor);
    }
}

suite('Formatter Test Suite', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    test('Formatter::should format assignment like =', () => {
        editor.selection = new vscode.Selection(6, 0, 6, 0);
        const formatter = new FakeFormatter();
        const ranges = formatter.getLineRanges(editor);
        const actual = formatter.format(ranges[0]);
        const expect = ['var abc     = 123;', 'var fsdafsf = 32423,', '    fasdf   = 1231321;'];
        assert.deepEqual(actual, expect);
    });

    test('Formatter::should format colon like :', () => {
        editor.selection = new vscode.Selection(12, 0, 12, 0);
        const formatter = new FakeFormatter();
        const ranges = formatter.getLineRanges(editor);
        const actual = formatter.format(ranges[0]);
        const expect = [
            '    line          : textline',
            '  , sgfntTokenType: TokenType.Invalid',
            '  , tokens        : []',
        ];
        assert.deepEqual(actual, expect);
    });
});
