import React, { useState } from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative w-full p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:shadow-2xl group">
      <div className="flex items-center justify-between mb-3">
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-white"
        >
          {labelName}
        </label>

        {isSurpriseMe && (
          <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="text-xs font-medium text-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-purple-500 hover:to-pink-500 px-3 py-1 rounded-md transition-all duration-300"
            >
              🎲 Surprise me
            </button>

            {showTooltip && (
              <div className="absolute top-[-40px] right-0 bg-black text-white text-xs px-3 py-2 rounded-md shadow-md z-10 opacity-90">
                Generate a random idea!
              </div>
            )}
          </div>
        )}
      </div>

      <input
        type={type}
        id={name}
        name={name}
        className="w-full p-3 text-sm text-black placeholder:text-gray-300 border border-white/30 rounded-lg bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default FormField;
