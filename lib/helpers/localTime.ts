export const getGreeting = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 19 || hour < 4) {
    return 'Good evening';
  } else if (hour >= 12) {
    return 'Hello';
  } else {
    return 'Good morning';
  }
};
