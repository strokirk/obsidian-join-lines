import { Editor, Plugin } from "obsidian";

export default class JoinLinesPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "join-lines",
      name: "Join lines",
      editorCallback(editor) {
        joinLines(editor);
      },
    });
  }
}

function joinLines(editor: Editor) {
  const selectedText = editor.getSelection();
  if (selectedText) {
    const joinedText = selectedText.replace(/\n/g, " ");
    editor.replaceSelection(joinedText);
    return;
  }
  // No text selected:
  // join current line with next line,
  // and preserve the cursor position
  const cursor = editor.getCursor();
  const currLine = cursor.line;
  const nextLine = currLine + 1;
  const currLineText = editor.getLine(currLine);
  const nextLineText = editor.getLine(nextLine);
  const joinedText = currLineText + " " + nextLineText;
  editor.replaceRange(
    joinedText,
    { line: currLine, ch: 0 },
    { line: nextLine, ch: nextLineText.length },
  );
  editor.setCursor({ line: currLine, ch: cursor.ch });
}
