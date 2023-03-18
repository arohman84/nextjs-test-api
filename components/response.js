import React, { useCallback, useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { json, jsonLanguage } from "@codemirror/lang-json";
import { languages } from "@codemirror/language-data";

function Response(data) {
  console.log(data);

  const beautify = require("js-beautify").js;

  const [resp, setResp] = useState("");

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
    console.log(data);
  }, []);

  useEffect(() => {
    const text = JSON.stringify(data.data);
    setResp(beautify(text, { indent_size: 2, space_in_empty_paren: true }));
  }, [data]);

  return (
    <div className="w-6/12">
      <p>response</p>
      <CodeMirror
        value={resp}
        height="500px"
        editable={false}
        indentWithTab={true}
        extensions={[
          json({
            base: jsonLanguage,
            codeLanguages: languages,
            addKeymap: true,
          }),
          EditorView.lineWrapping,
        ]}
        onChange={onChange}
      />
    </div>
  );
}
export default Response;
