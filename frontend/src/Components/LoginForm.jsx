import {useAuthentication} from '../Hooks/apiHooks';
import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router';
import {useState} from 'react';

const LoginForm = () => {
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const initValues = {
    username: '',
    password: '',
  };

  const validateForm = () => {
    const newErrors = {};

    if (!inputs.username.trim()) newErrors.username = 'Email is required';
    if (!inputs.password) newErrors.password = 'Password is required';

    // Email format validation if needed
    if (inputs.username && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.username)) {
      newErrors.username = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const doLogin = async () => {
    if (!validateForm()) return;

    try {
      await postLogin(inputs);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setErrors(prev => ({...prev, apiError: error.message}));
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      {errors.apiError && <div className="error">{errors.apiError}</div>}
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4 w-[100%] m-8 rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="font-bold font-stretch-50%">Kirjaudu sisään</h1>
        <p className="m-1">Syötä sähköposti ja salasana kirjautuaksesi</p>

        <form onSubmit={handleSubmit} className="*:mt-6 p-2 w-full">
          {/* Email/Username */}
          <div>
            <label htmlFor="loginuser">Sähköposti*</label>
            <input
              className="p-3 border border-gray-500 rounded-lg mt-2 py-2 w-full"
              onChange={handleInputChange}
              type="email"
              id="loginuser"
              name="username"
              value={inputs.username}
              required
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="loginpassword">Salasana*</label>
            <input
              className="p-3 border border-gray-500 rounded-lg mt-2 py-2 w-full"
              name="password"
              type="password"
              id="loginpassword"
              onChange={handleInputChange}
              value={inputs.password}
              required
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          <button
            className="bg-[var(--primary-color)] text-[var(--white-color)] rounded-4xl hover:bg-[var(--grey-color)] transition duration-300 w-full py-4 mt-6 font-medium"
            type="submit"
          >
            Kirjaudu sisään
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
