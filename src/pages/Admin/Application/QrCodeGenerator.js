import './_QrCode.scss'
import React, { useState } from "react"
import QRCode from "react-qr-code";

// MUI component
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';

const QrCodeGenerator = () => {
    const [text, setText] = useState('Hello world')

    const handleChange = (e) => {
        setText(e.target.value)
        console.log(document.getElementById('testing'), 'ss')
    }

    const onImageCownload = () => {
        const svg = document.getElementById("QRCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = "QRCode";
          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
      };

    return (
        <div className="header-default">
            <div className="hero"></div>
            <div className="content__qrcode">
                <TextField label="Text qr-code" variant="outlined" onChange={handleChange} />
                <br />
                <QRCode id="QRCode" value={text} />
                <br />
                <p>{text ? text : 'Hello world'}</p>
                <br />
                <Button variant="contained" onClick={onImageCownload}>Download Image</Button>
            </div>
        </div>
    )
}

export default QrCodeGenerator
