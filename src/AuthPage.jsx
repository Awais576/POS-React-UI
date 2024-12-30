import  { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const AuthPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      username: '',
      confirmPassword: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [storedUser, setStoredUser] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
    const showToast = (message, type = 'error') => {
      setToast({ show: true, message, type });
      setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    };
  
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
  
    const validatePassword = (password) => {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      return re.test(password);
    };
  
    const validateUsername = (username) => {
      const re = /^[a-z0-9]+$/;
      return re.test(username);
    };
  
    const validateForm = () => {
      const newErrors = {};
  
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
  
      if (!formData.password) newErrors.password = 'Password is required';
      else if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be 6+ characters with 1 uppercase, 1 lowercase, 1 number, 1 special character';
      }
  
      if (!isLoginView) {
        if (!formData.username) newErrors.username = 'Username is required';
        else if (!validateUsername(formData.username)) {
          newErrors.username = 'Username can only contain lowercase letters and numbers';
        }
  
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
        else if (formData.confirmPassword !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const { email, password } = formData;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        // Simulating API call
        if (isLoginView) {
          if (storedUser && email === storedUser.email && password === storedUser.password) {
            showToast('Login successful!', 'success');
            setTimeout(() => navigate('/main'), 1500);
          } else {
            showToast('Invalid credentials');
          }
        } else {
          setStoredUser({ email, password }); // Store credentials during signup
          showToast('Registration successful!', 'success');
        }
      }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span>{toast.message}</span>
        </div>
      )}

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Auth Form */}
          <div className={`w-full md:w-1/2 p-8 transition-transform duration-500 ${
            isLoginView ? 'translate-x-0' : '-translate-x-full md:translate-x-full'
          }`}>
            <h2 className="text-2xl font-bold mb-6">
              {isLoginView ? 'Sign in' : 'Sign up'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginView && (
                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className={`w-full p-3 rounded-lg ${errors.username ? 'border-2 border-red-500' : 'bg-gray-100'}`}
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>
              )}

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`w-full p-3 rounded-lg ${errors.email ? 'border-2 border-red-500' : 'bg-gray-100'}`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`w-full p-3 rounded-lg ${errors.password ? 'border-2 border-red-500' : 'bg-gray-100'}`}
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {!isLoginView && (
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={`w-full p-3 rounded-lg ${errors.confirmPassword ? 'border-2 border-red-500' : 'bg-gray-100'}`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {isLoginView && (
                <div className="text-right">
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                    Forgot your password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                {isLoginView ? 'SIGN IN' : 'SIGN UP'}
              </button>
            </form>
          </div>

          {/* Welcome Section */}
          <div className={`w-full md:w-1/2 bg-red-500 text-white p-8 flex flex-col items-center justify-center text-center transition-transform duration-500 ${
            isLoginView ? 'translate-x-0' : 'translate-x-full md:-translate-x-full'
          }`}>
            <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
            <p className="mb-8">
              {isLoginView 
                ? "Enter your personal details and start journey with us"
                : "Welcome back! Please login with your personal info"
              }
            </p>
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setFormData({ email: '', password: '', username: '', confirmPassword: '' });
                setErrors({});
              }}
              className="px-8 py-3 border-2 border-white rounded-lg font-medium hover:bg-white hover:text-red-500 transition-colors"
            >
              {isLoginView ? 'SIGN UP' : 'SIGN IN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;