const LoginPage = ({ afterLogin }) => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const resp = await fetch('http://localhost:2005/users/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
    const respObj = await resp.json();
    console.log(resp);
    console.log(respObj);
    if (respObj.status === 'success') {
      afterLogin(respObj);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" name="email" required />

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />

        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
