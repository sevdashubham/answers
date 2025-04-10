import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PrimaryButton } from './ButtonStyles';
import { LoginFormProps, FormValues } from './types';

// Schema for form validation
const createValidationSchema = (isSignUp: boolean) => {
  const baseSchema = {
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email')
      .min(5, 'Email must be at least 5 characters')
      .max(255, 'Email must be less than 255 characters'),
  };

  // Add more strict password validation for sign up
  const passwordSchema = isSignUp
    ? yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /(?=.*[a-z])/,
          'Password must contain at least one lowercase letter'
        )
        .matches(
          /(?=.*[A-Z])/,
          'Password must contain at least one uppercase letter'
        )
        .matches(/(?=.*\d)/, 'Password must contain at least one number')
        .matches(
          /(?=.*[!@#$%^&*])/,
          'Password must contain at least one special character'
        )
    : yup.string().required('Password is required');

  return yup.object({
    ...baseSchema,
    password: passwordSchema,
  });
};

const LoginForm: React.FC<LoginFormProps> = ({ isSignUp, loading, onSubmit }) => {
  // Create validation schema based on auth mode
  const validationSchema = createValidationSchema(isSignUp);

  // Initialize form with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur', // Validate on blur for better UX
  });

  // Form submit handler
  const submitHandler = (data: FormValues) => {
    onSubmit(data);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitHandler)}>
      <div className="space-y-4 rounded-md">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            {...register('email')}
            type="email"
            className={`relative block w-full rounded-md border-0 bg-zinc-800 py-3 px-4 text-white placeholder-gray-400 focus:ring-2 focus:outline-none ${
              errors.email ? 'focus:ring-red-500' : 'focus:ring-lime-400'
            }`}
            autoComplete="username"
            placeholder="Email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            {...register('password')}
            type="password"
            className={`relative block w-full rounded-md border-0 bg-zinc-800 py-3 px-4 text-white placeholder-gray-400 focus:ring-2 focus:outline-none ${
              errors.password ? 'focus:ring-red-500' : 'focus:ring-lime-400'
            }`}
            autoComplete="current-password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div>
        <PrimaryButton type="submit" loading={loading}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default LoginForm;
