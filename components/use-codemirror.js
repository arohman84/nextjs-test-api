import { useEffect, useState, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { json, jsonLanguage } from "@codemirror/lang-json";
import { languages } from "@codemirror/language-data";
import { oneDark } from "@codemirror/theme-one-dark";

const useCodeMirror = (props) => {
  const refContainer = useRef(null);
  const [editorView, setEditorView] = useState();
  const { onChange } = props;

  useEffect(() => {
    if (!refContainer.current) return;

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),

        json({
          base: jsonLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        oneDark,
        // EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });
    setEditorView(view);

    return () => {
      view.destroy();
    };
  }, [refContainer]);

  return [refContainer, editorView];
};

export default useCodeMirror;
