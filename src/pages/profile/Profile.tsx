import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from '@/redux/store/slices';
import { type RootState } from '@/redux/store/store';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogin = (response: any) => {
    if (response.credential) {
      const decoded: any = jwtDecode(response.credential);
      dispatch(setUser({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      }));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="container mx-auto py-8 text-center text-2xl text-black dark:text-white">
      {user ? (
        <div>
          <h2 className="mb-2">Добро пожаловать, {user.name}</h2>
          <img src={user.picture} alt="avatar" className="mx-auto w-24 h-24 rounded-full mb-4" />
          <p>{user.email}</p>
          <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
            Выйти
          </button>
        </div>
      ) : (
        <>
          <h1 className="mb-4">Войдите через Google</h1>
          <div style={{ display: 'inline-block', transform: 'scale(1.2)' }}>
            <GoogleLogin
              onSuccess={handleLogin}
              onError={() => console.log("Ошибка входа")}
              // theme="filled_blue"
              size="large"
            />  
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
