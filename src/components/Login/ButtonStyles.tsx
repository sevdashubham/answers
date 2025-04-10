import { ButtonProps } from './types';

// Primary button with the lime gradient
export const PrimaryButton: React.FC<ButtonProps> = ({ 
  children, 
  loading = false, 
  onClick, 
  type = 'button' 
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className="relative w-full px-5 py-2 rounded-lg flex items-center justify-center text-lime-300 overflow-hidden mb-4"
      style={{
        border: "2px solid #577113",
        background: "linear-gradient(to bottom, #C8E972, #23291E)",
        outline: "1px solid #23291E",
        outlineOffset: "-1px",
      }}
    >
      <div
        className="absolute inset-0 m-px rounded-md bg-zinc-900 z-0"
        style={{
          outline: "1px solid #23291E",
          outlineOffset: "-1px",
        }}
      />
      <span className="relative z-10 font-semibold">
        {loading ? "Loading..." : children}
      </span>
    </button>
  );
};

// Secondary button (like the Google sign-in)
export const SecondaryButton: React.FC<ButtonProps> = ({ 
  children, 
  loading = false, 
  onClick, 
  type = 'button' 
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className="relative w-full px-5 py-2 rounded-lg flex items-center justify-center text-white"
      style={{
        border: "1px solid #444",
        background: "#2A2A2A",
      }}
    >
      {children}
    </button>
  );
};