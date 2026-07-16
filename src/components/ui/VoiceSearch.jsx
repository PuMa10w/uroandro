// src/components/ui/VoiceSearch.jsx — Voice search button for iPhone Safari
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * VoiceSearch — voice input button with automatic fallback.
 * Works on iOS Safari with Web Speech API or falls back to keyboard.
 */
export default function VoiceSearch({ onResult, placeholder = 'Говори...' }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupported(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'ru-RU';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => {
      setListening(false);
      setSupported(false);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult?.(transcript);
    };

    recognition.start();
  };

  return (
    <button
      type="button"
      onClick={startListening}
      disabled={!supported || listening}
      className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
        listening ? 'bg-danger animate-pulse' : 'bg-teal hover:bg-teal-dark'
      }`}
      aria-label={listening ? 'Останавливаю' : 'Голосовой поиск'}
    >
      {listening ? '🔴' : '🎤'}
    </button>
  );
}

VoiceSearch.propTypes = {
  onResult: PropTypes.func,
  placeholder: PropTypes.string,
};
