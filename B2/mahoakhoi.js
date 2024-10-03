function goBack() {
    window.location.href = 'index.html';
}

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
    
     if (key.length !== 64) {
        alert("Khóa DES không hợp lệ. Vui lòng đảm bảo rằng khóa có độ dài 64 bit.");
        return;
    }   

    let result;
    if (action === 'encode') {
        result = CryptoJS.DES.encrypt(inputText, key).toString();
    } else {
        result = CryptoJS.DES.decrypt(inputText, key).toString(CryptoJS.enc.Utf8);
    }

    document.getElementById('result').value = result;
}

function generateKey() {
    // Tạo khóa 64 bits ngẫu nhiên
    let key = [];
    for (let i = 0; i < 64; i++) {
        key.push(Math.floor(Math.random() * 2));
    }

    // Thêm parity bits (8 bits kiểm tra)
    for (let i = 0; i < 8; i++) {
        let byte = key.slice(i * 8, (i + 1) * 8);
        let parityBit = byte.reduce((a, b) => a + b) % 2;  // Tính tổng các bit và lấy modulo 2
        key[i * 8 + 7] = parityBit;  // Gán bit kiểm tra cho vị trí cuối của mỗi byte
    }

    // Chuyển đổi mảng bit thành chuỗi nhị phân
    let keyStr = key.join('');
    document.getElementById('desKey').value = keyStr;  // Hiển thị khóa vừa tạo trong input
    alert("Khóa DES đã được tạo tự động!");
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
