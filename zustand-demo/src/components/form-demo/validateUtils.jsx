// 验证表单
export const validateStep1Form = (data) => {
  const { name, email, phone, age } = data;
  
  const nameValid = name.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = /^1[3-9]\d{9}$/.test(phone);
  const ageValid = age && parseInt(age) >= 18 && parseInt(age) <= 100;
  
  return nameValid && emailValid && phoneValid && ageValid;
};