// Shared types for Login components
export type AuthMode = 'signin' | 'signup';

export interface FormValues {
  email: string;
  password: string;
}

export interface AuthError {
  message: string;
}

export interface AuthSuccess {
  message: string;
}

export interface ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface MessageProps {
  message: string | null;
}

export interface AuthToggleProps {
  isSignUp: boolean;
  onToggle: () => void;
}

export interface LoginFormProps {
  isSignUp: boolean;
  loading: boolean;
  onSubmit: (values: FormValues) => Promise<void>;
}