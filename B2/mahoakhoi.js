function goBack() {
    window.location.href = 'index.html';

function loadFile(inputId) {
    const input = document.getElementById(inputId);
    const fileInput = document.getElementById(inputId + 'File');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.readAsText(file, 'UTF-8');

    reader.onload = function(e) {
        input.value = e.target.result;
    };

    reader.onerror = function() {
        alert('Không thể đọc tệp. Vui lòng thử lại.');
    };
}

// Hàm xử lý mã hóa/giải mã DES
function processText5() {
    const action = document.getElementById('action').value;
    const key = document.getElementById('desKey').value;
    let inputText = '';

    if (action === 'encode') {
        inputText = document.getElementById('plaintext').value;
    } else {
        inputText = document.getElementById('ciphertext').value;
    }

    let result;
    if (action === 'encode') {
        result = CryptoJS.DES.encrypt(inputText, key).toString();
    } else {
        result = CryptoJS.DES.decrypt(inputText, key).toString(CryptoJS.enc.Utf8);
    }

    document.getElementById('result').value = result;
}

// Hàm xử lý mã hóa/giải mã AES
function processText6() {
    const action = document.getElementById('action').value;
    const key = document.getElementById('aesKey').value;
    let inputText = '';

    if (action === 'encode') {
        inputText = document.getElementById('plaintext').value;
    } else {
        inputText = document.getElementById('ciphertext').value;
    }

    let result;
    if (action === 'encode') {
        result = CryptoJS.AES.encrypt(inputText, key).toString();
    } else {
        result = CryptoJS.AES.decrypt(inputText, key).toString(CryptoJS.enc.Utf8);
    }

    document.getElementById('result').value = result;
}
