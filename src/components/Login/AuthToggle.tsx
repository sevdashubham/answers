import { AuthToggleProps } from './types';

const AuthToggle: React.FC<AuthToggleProps> = ({ isSignUp, onToggle }) => {
  return (
    <div className="text-center">
      <button
        type="button"
        onClick={onToggle}
        className="text-lime-300 hover:underline focus:outline-none"
      >
        {isSignUp
          ? "Already have an account? Sign In"
          : "Need an account? Sign Up"}
      </button>
    </div>
  );
};

export default AuthToggle;