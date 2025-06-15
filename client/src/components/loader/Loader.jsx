import React, { useEffect, useState } from 'react';

const phrases = [
  'Typing secrets...',
  'Decoding drama...',
  'Someone’s spilling chai ☕️...',
  'Unfolding heartbreak 💔...',
  'Revealing midnight thoughts 🌙...',
  'Loading spicy gossip 🔥...',
  'Unlocking forbidden feels 🔐...',
  'Shh... don’t tell anyone 🤫...',
  'Typing what they could never say out loud 📝...',
];

const delayedPhrases = [
  "Still typing... this one's extra juicy 👀",
  "They're overthinking every word 💭...",
  "Gathering courage... it's not easy to confess 😶‍🌫️",
  "Trying not to get caught while typing this 😳...",
  "It’s getting emotional... hang tight 💬",
  "Confession almost too hot for the server 🔥🔥🔥",
  "Decrypting extra feelings... please wait 💌",
  "This one's complicated... like their situationship 😅",
  "Spilling takes time when it’s real tea ☕️⏳",
  "They're deciding whether to hit send or not... 🙈"
];

const ConfessionLoader = () => {
  const [text, setText] = useState(phrases[0]);
  const [useDelayed, setUseDelayed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUseDelayed(true); // Switch to delayed phrases after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const activePhrases = useDelayed ? delayedPhrases : phrases;

    const interval = setInterval(() => {
      setText(prev => {
        const index = activePhrases.indexOf(prev);
        const nextIndex = (index + 1) % activePhrases.length;
        return activePhrases[nextIndex];
      });
    }, 1800); // change every 1.8 seconds

    return () => clearInterval(interval);
  }, [useDelayed]);
  
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4 text-center">
      <div className="text-xl md:text-2xl font-semibold text-pink-500 animate-pulse">
        {text}
      </div>
      <div className="flex space-x-2 mt-2">
        <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce" />
        <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-150" />
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-300" />
      </div>
    </div>
  );
};

export default ConfessionLoader;
