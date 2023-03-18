import React, { useCallback, useEffect } from "react";
import { EditorState } from "@codemirror/state";
import useCodeMirror from "./use-codemirror";

const Config = (props) => {
  const { onChange, initialDoc } = props;
  const handleChange = useCallback(
    (state) => onChange(state.doc.toString()),
    [onChange]
  );
  const [refContainer, editorView] = useCodeMirror({
    initialDoc: initialDoc,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      // Do nothing for now
    } else {
      // loading editor
    }
  }, [editorView]);

  return <div className="w-1/2 h-full" ref={refContainer}></div>;
};

export default Config;
