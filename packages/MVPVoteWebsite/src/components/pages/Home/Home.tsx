import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
  <div className="bg-primary w-screen h-screen grid content-center justify-items-center overflow-hidden">
    <button className="bg-primary text-secondary border-4 p-2 w-40 text-2xl font-gill rounded-xl top-6 right-6 absolute">Log in</button>
    <img src="/logo_noBackground.png" alt="" className="h-52"/>
    <h1 className="text-secondary text-4xl mt-4 font-gill font-normal">Vote</h1>
    <button onClick={() => {navigate('/create')}} className="bg-secondary text-primary p-2 w-56 text-2xl font-gill rounded-xl mt-24">Create a new vote</button>
    <button onClick={() => {navigate('/join')}} className="bg-secondary text-primary p-2 w-56 text-2xl font-gill rounded-xl mt-6">Join vote</button>
    {/* <button className="bg-primary text-secondary border-4 p-2 w-56 text-2xl font-gill rounded-xl mt-6">My votes</button> */}
  </div>
  );
};

export default Home;
