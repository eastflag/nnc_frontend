/** @jsxImportSource @emotion/react */

import {useState} from "react";
import axios from "axios";
import {css} from "@emotion/react";

export const ImageUpload = () => {
    const [url, setUrl] = useState(null);

    const handleFileChange = async (e: any) => {
        const file = e.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append("type", file.type);
        formData.append("image", file, file.name);

        const {data} = await axios.post('/api/v1/demo/image/upload', formData)
        console.log(data)
        setUrl(data.data.url);
    }

    const submit = (e: any) => {
        e.preventDefault();
        // 이미지 첨부한 후에 리턴된 url을 보낸다.
    }

    return (
        <form onSubmit={submit}>
            <input
                className='file-input'
                type="file"
                onChange={handleFileChange}
            />
            {url && <img src={url} css={css`
                width: 150px;
              `} /> }
            <br />
            <button type="submit">upload</button>
        </form>
    );
}