import React from 'react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void; // Adicione a propriedade onClose opcional
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mr-3">
      {message}
      {onClose && (
        <button onClick={onClose} className="ml-2 focus:outline-none">
          &#10006; {/* X para fechar */}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;