import { useNavigate } from "react-router-dom";
import logo from "/logo.svg"
import Switch from '@mui/material/Switch';

const Create = () => {

  const navigate = useNavigate();

  let randomCode:string

  const generateRandomCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    randomCode = result

    return randomCode;
  }

  const handleCreateVote = () => {
    generateRandomCode()
    navigate(`/qr/${randomCode}`)
  }

  return (
    <div className="bg-primary w-screen h-screen grid justify-items-center">
      <div className="flex flex-col items-center">
        <img src={logo} alt="" className="h-32 mt-4"/>
        <h1 className="font-gill text-secondary text-4xl mt-2">Create a new vote</h1>
      </div>
      <div className="-mt-40">
        <div className="flex w-screen px-16 justify-between items-center">
          <p className="font-gill text-secondary text-2xl mt-2">Loser of the match</p>
          <Switch defaultChecked color="success" className="mt-2"/>
        </div>
        <div className="flex w-screen px-16 justify-between items-center mt-4">
          <p className="font-gill text-secondary text-2xl mt-2">Comments</p>
          <Switch defaultChecked color="success" className="mt-2"/>
        </div>
        <p className="font-gill text-secondary ml-16 pr-32 opacity-45">Add some funny comments to explain your vote!</p>
      </div>
      <button onClick={() => {handleCreateVote()}} className="bg-secondary text-primary w-56 text-2xl font-gill rounded-xl absolute bottom-16 p-2">Create vote</button>
    </div>
  );
};

export default Create;
