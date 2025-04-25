import {useUser} from '../Hooks/apiHooks';
import useForm from '../Hooks/formHooks';
import {useState} from 'react';

const RegisterForm = () => {
  const {postUser} = useUser();
  const [errors, setErrors] = useState({});

  const initValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
  };

  const validateForm = () => {
    const newErrors = {};

    // Check each required field
    if (!inputs.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!inputs.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!inputs.email.trim()) newErrors.email = 'Email is required';
    if (!inputs.password) newErrors.password = 'Password is required';
    if (!inputs.phone.trim()) newErrors.phone = 'Phone is required';
    if (!inputs.address.trim()) newErrors.address = 'Address is required';
    if (!inputs.city.trim()) newErrors.city = 'City is required';
    if (!inputs.postal_code.trim()) newErrors.postal_code = 'Postal code is required';

    // Email format validation
    if (inputs.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password strength (example)
    if (inputs.password && inputs.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const doRegister = async () => {
    if (!validateForm()) return;

    try {
      const userData = {
        ...inputs,
        type: 'user'
      };
      const userResult = await postUser(userData);
      console.log('Registration successful:', userResult);
      // Redirect or show success message
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle API errors (like duplicate email)
      setErrors(prev => ({...prev, apiError: error.message}));
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <>
      <h1>Register</h1>
      {errors.apiError && <div className="error">{errors.apiError}</div>}
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <label htmlFor="first_name">Etunimi*</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="first_name"
            name="first_name"
            value={inputs.first_name}
            required
          />
          {errors.first_name && <span className="error">{errors.first_name}</span>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="last_name">Sukunimi*</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="last_name"
            name="last_name"
            value={inputs.last_name}
            required
          />
          {errors.last_name && <span className="error">{errors.last_name}</span>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email*</label>
          <input
            onChange={handleInputChange}
            type="email"
            id="email"
            name="email"
            value={inputs.email}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Salasana* (min 6 characters)</label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
            value={inputs.password}
            required
            minLength="6"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone">Puhelin*</label>
          <input
            onChange={handleInputChange}
            type="tel"
            id="phone"
            name="phone"
            value={inputs.phone}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address">Osoite*</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="address"
            name="address"
            value={inputs.address}
            required
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city">Kaupunki*</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="city"
            name="city"
            value={inputs.city}
            required
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        {/* Postal Code */}
        <div>
          <label htmlFor="postal_code">Postinumero*</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="postal_code"
            name="postal_code"
            value={inputs.postal_code}
            required
          />
          {errors.postal_code && <span className="error">{errors.postal_code}</span>}
        </div>

        <button type="submit">Rekisteröidy</button>
      </form>
    </>
  );
};

export default RegisterForm;
