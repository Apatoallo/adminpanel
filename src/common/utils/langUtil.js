export const getBrowserLanguage = () => {
  const language =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;
  return language === 'tr' ? 'TR' : 'EN';
};
