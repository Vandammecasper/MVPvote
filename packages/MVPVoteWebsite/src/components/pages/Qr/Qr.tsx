import { useNavigate } from "react-router-dom";
import logo from "/logo.svg"
import QRCode from "react-qr-code";

const Qr = () => {

  const navigate = useNavigate();
  const url = window.location.pathname
  const code = url.split('/')[2]

  return (
  <div className="bg-primary w-screen h-screen grid justify-items-center px-2">
    <div className="flex flex-col items-center">
      <img src={logo} alt="" className="h-32 mt-4"/>
      <h1 className="font-gill text-secondary text-4xl mt-2 text-center">Let your teammates scan the QR-code to start</h1>
    </div>
    <div className="-mt-24">
      <div className="bg-secondary p-2">
        <QRCode value={code}/>
      </div>
      <p className="font-gill text-secondary text-3xl text-center mt-8">Teammates joined:</p>
      <p className="font-gill text-secondary text-4xl text-center mt-2">0</p>
    </div>
    <button onClick={() => {navigate('/qr')}} className="bg-secondary text-primary w-56 text-2xl font-gill rounded-xl absolute bottom-16 p-2">Start voting</button>
  </div>
);
};

export default Qr;
