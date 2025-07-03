// Simple Calendar Logic
const calendarEl = document.getElementById('calendar');
let selectedDate = null;

function renderCalendar(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    let html = '<table class="calendar-table">';
    html += '<tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr><tr>';

    let day = 1;
    for (let i = 0; i < 7; i++) {
        if (i < startDay) html += `<td class="inactive"></td>`;
        else html += getDayCell(year, month, day++);
    }
    html += '</tr>';

    while (day <= daysInMonth) {
        html += '<tr>';
        for (let i = 0; i < 7; i++) {
            if (day > daysInMonth) html += `<td class="inactive"></td>`;
            else html += getDayCell(year, month, day++);
        }
        html += '</tr>';
    }
    html += '</table>';
    calendarEl.innerHTML = html;

    // Add click events
    document.querySelectorAll('.calendar-table td:not(.inactive)').forEach(td => {
        td.onclick = function() {
            selectedDate = new Date(year, month, parseInt(this.textContent));
            renderCalendar(selectedDate);
        };
    });
}

function getDayCell(year, month, day) {
    let classes = '';
    if (
        selectedDate &&
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === day
    ) {
        classes = 'selected';
    }
    return `<td class="${classes}">${day}</td>`;
}

renderCalendar();

// Test selection
document.querySelectorAll('.test-btn').forEach(btn => {
    btn.onclick = function() {
        document.querySelectorAll('.test-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    }
});

// Result selection
document.querySelectorAll('.result-box').forEach(box => {
    box.onclick = function() {
        document.querySelectorAll('.result-box').forEach(b => b.classList.remove('selected'));
        box.classList.add('selected');
    }
});
document.getElementById('confirm-btn').onclick = function() {
    const selectedTest = document.querySelector('.test-btn.selected');
    const selectedResult = document.querySelector('.result-box.selected');
    const selectedTime = document.getElementById('time-select').value;
    const messageDiv = document.getElementById('error-message');
    let message = "";

    if (!selectedTest) {
        message = "You must select a test.";
    } else if (!selectedDate) {
        message = "You must select a date.";
    } else if (!selectedTime) {
        message = "You must select a time.";
    } else if (!selectedResult) {
        message = "You must select a result option.";
    }

    if (message) {
        messageDiv.style.color = "red";
        messageDiv.textContent = message;
    } else {
        messageDiv.textContent = "";
        // Fill summary modal
        document.getElementById('summary-test').textContent = selectedTest.textContent;
        document.getElementById('summary-date').textContent = selectedDate.toLocaleDateString();
        document.getElementById('summary-time').textContent = selectedTime;
        document.getElementById('summary-result').textContent = selectedResult.textContent;
        // Show modal
        document.getElementById('summary-modal').style.display = "flex";
    }
};
document.getElementById('payment-btn').onclick = function() {
    window.location.href = '../Payment/main page.html';
};

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
        // Simple bot responses
        let botResponse = "I'm a mock chatbot. For real assistance, please contact our front desk.";
        if (userMessage.toLowerCase().includes('login') || userMessage.toLowerCase().includes('log in')) {
            botResponse = "Click the 'Login' button to access your account. If you forgot your password, please contact IT support.";
        } else if (userMessage.toLowerCase().includes('register') || userMessage.toLowerCase().includes('sign up')) {
            botResponse = "Click the 'Register' button to create a new account. You'll need your patient ID and personal information.";
        } else if (userMessage.toLowerCase().includes('hours') || userMessage.toLowerCase().includes('open')) {
            botResponse = "Our hospital is open 24/7. The reception desk is staffed from 7AM to 9PM daily.";
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
