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


function modInverse(e, phi) {
    let t = 0, newT = 1;
    let r = phi, newR = e;

    while (newR !== 0) {
        let quotient = Math.floor(r / newR);
        [t, newT] = [newT, t - quotient * newT];
        [r, newR] = [newR, r - quotient * newR];
    }

    if (r > 1) return null; // Không có nghịch đảo
    if (t < 0) t += phi;
    return t;
}
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function processTextRSA() {
    const p = parseInt(document.getElementById('pValue').value);
    const q = parseInt(document.getElementById('qValue').value);
    const e = parseInt(document.getElementById('eValue').value);
    const action = document.getElementById('action').value;
    let inputText = '';

    if (action === 'encode') {
        inputText = document.getElementById('plaintext').value;
    } else {
        inputText = document.getElementById('ciphertext').value;
    }

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    // Kiểm tra nếu e và phi là nguyên tố cùng nhau
    if (gcd(e, phi) !== 1) {
        alert('e và phi(n) phải nguyên tố cùng nhau.');
        return;
    }

    // Tính d (nghịch đảo của e mod phi)
    const d = modInverse(e, phi);
    if (!d) {
        alert('Không thể tính nghịch đảo của e mod phi.');
        return;
    }

    let result;
    if (action === 'encode') {
        result = rsaCipher(inputText, e, d, n, true);  // Mã hóa
    } else {
        // Tách chuỗi số ra thành mảng các số trước khi giải mã
        const ciphertextNumbers = inputText.split(' ').map(Number);
        result = ciphertextNumbers.map(num => rsaCipher(String.fromCharCode(num), e, d, n, false)).join('');
    }

    document.getElementById('result').value = result;
}

function rsaCipher(text, e, d, n, encode = true) {
    let result = '';

    // Mã hóa hoặc giải mã từng ký tự dựa trên ASCII code
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);

        if (encode) {
            // Mã hóa: C = M^e mod n
            let encrypted = modExp(charCode, e, n);
            result += encrypted + ' ';  // Lưu kết quả dưới dạng chuỗi số, cách nhau bằng dấu cách
        } else {
            // Giải mã: M = C^d mod n
            let decrypted = modExp(charCode, d, n);
            result += String.fromCharCode(decrypted);
        }
    }

    return encode ? result.trim() : result;
}

// Hàm lũy thừa modular (modular exponentiation)
function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}
