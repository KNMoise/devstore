// Function to format currency
export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: '   RWF',
    }).format(amount);
  };
  
  // Function to validate email
  export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Function to validate product stock availability
  export const isStockAvailable = (productStock: number, requestedQuantity: number) => {
    return productStock >= requestedQuantity;
  };
  
  // Function to capitalize the first letter of a string
  export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Function to sanitize input (prevent XSS attacks)
  export const sanitizeInput = (input: string) => {
    const element = document.createElement('div');
    if (input) {
      element.innerText = input;
      element.textContent = input;
    }
    return element.innerHTML;
  };
  
  // Function to generate a random string (e.g., for order IDs or temp tokens)
  export const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  