import {useUser} from '../Hooks/apiHooks';
import useForm from '../Hooks/formHooks';

const RegisterForm = () => {
  const {postUser} = useUser();

  const initValues = {
    first_name: '',  // Changed from firstname
    last_name: '',   // Changed from lastname
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '', // Changed from postalcode
  };

  const doRegister = async () => {
    try {
      // Transform data if needed (alternative approach)
      const userData = {
        ...inputs,
        type: 'user'
      };

      console.log('Sending:', userData);
      const userResult = await postUser(userData);
      console.log('Result:', userResult);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="first_name"
            name="first_name"
            value={inputs.first_name}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="last_name"
            name="last_name"
            value={inputs.last_name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleInputChange}
            autoComplete="email"
            type="email"
            id="email"
            name="email"
            value={inputs.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
            autoComplete="current-password"
            value={inputs.password}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            onChange={handleInputChange}
            type="tel"
            id="phone"
            name="phone"
            value={inputs.phone}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="address"
            name="address"
            value={inputs.address}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="city"
            name="city"
            value={inputs.city}
          />
        </div>
        <div>
          <label htmlFor="postal_code">Postal Code</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="postal_code"
            name="postal_code"
            value={inputs.postal_code}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
