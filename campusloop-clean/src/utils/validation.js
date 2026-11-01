/**
 * Validation utilities for CampusLoop college marketplace.
 */

// Rule 1: Resale price cannot exceed 50% of reference market price.
export const validatePriceCap = (marketPrice, resalePrice) => {
  const numMarket = parseFloat(marketPrice);
  const numResale = parseFloat(resalePrice);

  if (isNaN(numMarket) || numMarket <= 0) {
    return {
      isValid: false,
      maxAllowed: 0,
      savings: 0,
      message: "Please enter a valid reference market price greater than ₹0."
    };
  }

  const maxAllowed = Math.floor(numMarket * 0.5);

  if (isNaN(numResale) || numResale <= 0) {
    return {
      isValid: false,
      maxAllowed,
      savings: 0,
      message: `Enter resale price (must not exceed ₹${maxAllowed.toLocaleString('en-IN')}).`
    };
  }

  if (numResale > maxAllowed) {
    const excess = numResale - maxAllowed;
    return {
      isValid: false,
      maxAllowed,
      savings: 0,
      message: `✕ Price exceeds the maximum allowed resale price of ₹${maxAllowed.toLocaleString('en-IN')} (by ₹${excess.toLocaleString('en-IN')}). CampusLoop strictly caps resale prices at 50% of market value to maintain campus affordability.`
    };
  }

  const savings = numMarket - numResale;
  const percentage = Math.round((savings / numMarket) * 100);

  return {
    isValid: true,
    maxAllowed,
    savings,
    percentage,
    message: `✓ Great! Your price follows CampusLoop's affordability rule. Fellow students save ₹${savings.toLocaleString('en-IN')} (${percentage}% off retail).`
  };
};

// College email validation (must contain .edu, .ac.in, or university domains)
export const validateCollegeEmail = (email) => {
  if (!email || !email.trim()) {
    return { isValid: false, message: "College email is required." };
  }
  const cleanEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, message: "Please enter a valid email format." };
  }

  const isCollegeDomain = 
    cleanEmail.endsWith('.edu') || 
    cleanEmail.includes('.ac.') || 
    cleanEmail.includes('amity.edu') || 
    cleanEmail.includes('.edu.') ||
    cleanEmail.includes('college') ||
    cleanEmail.includes('university') ||
    cleanEmail.includes('campus');

  if (!isCollegeDomain) {
    return {
      isValid: false,
      message: "Please use your official college/university email address (e.g., student@amity.edu, .ac.in, or .edu domain)."
    };
  }

  return { isValid: true, message: "Valid college email domain." };
};

// Image validation: JPG, JPEG, PNG, WEBP and max 5MB
export const validateImageFile = (file) => {
  if (!file) return { isValid: false, message: "No image file provided." };

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type.toLowerCase())) {
    return {
      isValid: false,
      message: "Unsupported file format. Please upload JPG, PNG, or WEBP images."
    };
  }

  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSizeInBytes) {
    return {
      isValid: false,
      message: "Image file exceeds the 5MB size limit. Please choose a smaller photo."
    };
  }

  return { isValid: true, message: "Image is valid." };
};
