import React, { useState } from "react";
import QRcode from "react-qr-code"

const LicenseCode = () => {
  const [value, setValue] = useState<string>('');
  const [background, setBackground] = useState<string>('#FFFFFF');
  const [foreground, setForeground] = useState<string>('#000000');
  const [size, setSize] = useState<number>(256);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mt-5">
        <h1>Generate QR Code</h1>
        <input type='text' onChange={(e) => setValue(e.target.value)} placeholder="Value of QR Code"></input><br /><br />
        <input onChange={(e) => setBackground(e.target.value)} placeholder="Background Color"></input><br /><br />
        <input onChange={(e) => setForeground(e.target.value)} placeholder="Foreground color"></input><br /><br />
        <input type='number' onChange={(e) => setSize(parseInt(e.target.value || '0',  10) ||  0)} placeholder="Size of QR Code"></input><br /><br />
        {value && (<QRcode value={value} size={size} bgColor={background} fgColor={foreground}/>)}
      </div>
    </div>
  )
}

export default LicenseCode;