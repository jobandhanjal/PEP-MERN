import Navbar from '../components/navBar';

const Homepage = ({ currUser, handleLogout }) => {
  return (
    <>
      <Navbar currUser={currUser} handleLogout={handleLogout} />
      <h1>hello </h1>
    </>
  );
};

export default Homepage;
