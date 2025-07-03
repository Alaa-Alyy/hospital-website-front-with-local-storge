// Utility to download text as a file
function downloadReceipt(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  
  // =====================
  // CASH PAYMENT
  // =====================
  const cashPayBtn = document.getElementById('cash-pay-btn');
  if (cashPayBtn) {
    cashPayBtn.onclick = function() {
      const name = document.getElementById('cashName').value;
      const phone = document.getElementById('cashPhone').value;
      const service = document.getElementById('cashService').value;
      if (!name || !phone || !service) {
        alert('Please fill in all fields.');
        return;
      }
      document.getElementById('cash-receipt').innerHTML = `
        <h2>Receipt</h2>
        <div><strong>Name:</strong> ${name}</div>
        <div><strong>Phone Number:</strong> ${phone}</div>
        <div><strong>Receipt Number:</strong> ${service}</div>
        <span id="cash-download" style="cursor:pointer;">⬇️</span>
      `;
      document.getElementById('cash-message').style.display = 'block';
      // Attach download event
      document.getElementById('cash-download').onclick = function() {
        const receiptText = `Name: ${name}\nPhone Number: ${phone}\nReceipt Number: ${service}`;
        downloadReceipt('cash_receipt.txt', receiptText);
      };
    };
  }
  
  // =====================
  // CARD PAYMENT
  // =====================
  const cardPayBtn = document.getElementById('card-pay-btn');
  if (cardPayBtn) {
    cardPayBtn.onclick = function() {
      const name = document.getElementById('cardName').value;
      const number = document.getElementById('cardNumber').value;
      const expiry = document.getElementById('expiry').value;
      const cvv = document.getElementById('cvv').value;
      const service = document.getElementById('cardService').value;
      if (!name || !number || !expiry || !cvv || !service) {
        alert('Please fill in all fields.');
        return;
      }
      document.getElementById('card-receipt').innerHTML = `
        <h2>Receipt</h2>
        <div><strong>Name:</strong> ${name}</div>
        <div><strong>Card Number:</strong> **** **** **** ${number.slice(-4)}</div>
        <div><strong>Receipt Number:</strong> ${service}</div>
        <span id="card-download" style="cursor:pointer;">⬇️</span>
      `;
      document.getElementById('card-message').style.display = 'block';
      // Attach download event
      document.getElementById('card-download').onclick = function() {
        const receiptText = `Name: ${name}\nCard Number: **** **** **** ${number.slice(-4)}\nReceipt Number: ${service}`;
        downloadReceipt('card_receipt.txt', receiptText);
      };
    };
  }
  
  // =====================
  // BANK TRANSFER PAYMENT
  // =====================
  const bankPayBtn = document.getElementById('bank-pay-btn');
  if (bankPayBtn) {
    bankPayBtn.onclick = function() {
      const bank = document.getElementById('bankName').value;
      const account = document.getElementById('bankAccount').value;
      const accountName = document.getElementById('bankAccountName').value;
      const iban = document.getElementById('bankIBAN').value;
      const swift = document.getElementById('bankSwift').value;
      const service = document.getElementById('bankService').value;
      if (!bank || !account || !accountName || !iban || !swift || !service) {
        alert('Please fill in all fields.');
        return;
      }
      document.getElementById('bank-receipt').innerHTML = `
        <h2>Receipt</h2>
        <div><strong>Bank Name:</strong> ${bank}</div>
        <div><strong>Account Number:</strong> ${account}</div>
        <div><strong>Account Name:</strong> ${accountName}</div>
        <div><strong>IBAN:</strong> ${iban}</div>
        <div><strong>Swift Code:</strong> ${swift}</div>
        <div><strong>Receipt Number:</strong> ${service}</div>
        <span id="bank-download" style="cursor:pointer;">⬇️</span>
      `;
      document.getElementById('bank-message').style.display = 'block';
      // Attach download event
      document.getElementById('bank-download').onclick = function() {
        const receiptText = `Bank Name: ${bank}\nAccount Number: ${account}\nAccount Name: ${accountName}\nIBAN: ${iban}\nSwift Code: ${swift}\nReceipt Number: ${service}`;
        downloadReceipt('bank_receipt.txt', receiptText);
      };
    };
  }

// Chatbot functionality
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    chatbotWindow.style.display = chatbotWindow.style.display === 'block' ? 'none' : 'block';
}

function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const messages = document.getElementById('chatbotMessages');
    const userMessage = input.value.trim();
    if (userMessage) {
        // Add user message
        messages.innerHTML += `<div class="message user-message">${userMessage}</div>`;
        input.value = '';
        // Payment-related bot responses
        let botResponse = "I'm here to help with payment-related questions. Please contact our front desk for other assistance.";
        if (userMessage.toLowerCase().includes('cash') || userMessage.toLowerCase().includes('cash payment')) {
            botResponse = "For cash payments, please fill in your name, phone number, and service number. Bring the receipt on your appointment day for validation.";
        } else if (userMessage.toLowerCase().includes('card') || userMessage.toLowerCase().includes('credit card')) {
            botResponse = "For card payments, please provide your card details and service number. You'll receive an email confirmation with your receipt.";
        } else if (userMessage.toLowerCase().includes('bank') || userMessage.toLowerCase().includes('transfer')) {
            botResponse = "For bank transfers, please provide your bank details and service number. We'll confirm your payment within 24 hours.";
        } else if (userMessage.toLowerCase().includes('receipt')) {
            botResponse = "You can download your receipt by clicking the download icon (⬇️) after completing your payment.";
        } else if (userMessage.toLowerCase().includes('insurance')) {
            botResponse = "We accept various insurance providers including MetLife, Allianz, Bupa, AXA, MedRight, and NileCare. Please bring your insurance card when you visit.";
        }
        // Add bot response after a short delay
        setTimeout(() => {
            messages.innerHTML += `<div class="message bot-message">${botResponse}</div>`;
            messages.scrollTop = messages.scrollHeight;
        }, 500);
        messages.scrollTop = messages.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const chatbotInput = document.getElementById('chatbotInput');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});