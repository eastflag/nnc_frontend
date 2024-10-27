/** @jsxImportSource @emotion/react */

import ReactQuill from 'react-quill';
import {useMemo, useRef, useState} from "react";
import {css} from "@emotion/react";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import {Grid} from "@mui/material"; // react-quill과 css파일 import 하기

export const QuillSample = () => {
  const [editorHtml, setEditorHtml] = useState();
  const quillRef = useRef<any>(null);

  const imageHandler = () => {
    const editor = quillRef?.current.getEditor();
    console.log(editor)
    const input: any = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        console.log(file);
        const formData = new FormData();
        formData.append("type", file.type);
        formData.append("image", file);
        const {data} = await axios.post('/api/v1/demo/image/upload1', formData)
        const url = data?.data?.url;
        editor.insertEmbed(editor.getSelection(), "image", url);
      } else {
        console.log('You could only upload images.');
      }
    };
  }

  const modules = useMemo(() => ({
    toolbar: { // 툴바 옵션들
      container: [
        [{size: ['small', false, 'large', 'huge']}],
        [{align: []}],
        ['bold', 'italic', 'underline', 'strike'],
        [{list: 'ordered'}, {list: 'bullet'}],
        [{color: []}, {background: []}],
        ["image", "video"],
      ],
      handlers: {
        image: imageHandler
      }
    },
  }), []);

  const handleChange = (html: any) => {
    setEditorHtml(html);
  }

  return (
    <div>
      <h3>Rich Editor: react-quill sample</h3>
      <button onClick={() => console.log(editorHtml)}>submit</button>
      <Grid container>
        <Grid item md={9} xs={12}>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            modules={modules}
            value={editorHtml}
            onChange={handleChange}
            css={css({
              width: '90%',
              height: '300px'
            })}
          />
        </Grid>
      </Grid>
    </div>
  );
}