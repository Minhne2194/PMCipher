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

function processText1() {
    const action = document.getElementById('action').value;
    const shift = parseInt(document.getElementById('shift').value) || 0;
    let inputText = '';

    if (action === 'encode') {
        inputText = document.getElementById('plaintext').value;
    } else {
        inputText = document.getElementById('ciphertext').value;
    }

    const result = caesarCipher(inputText, shift, action === 'encode');
    document.getElementById('result').value = result;
}

function caesarCipher(text, shift, encode = true) {
    const asciiSize = 256;
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);

        if (encode) {
            charCode = (charCode + shift) % asciiSize;
        } else {
            charCode = (charCode - shift + asciiSize) % asciiSize;
        }

        result += String.fromCharCode(charCode);
    }

    return result;
}

function processText2() {
    const action = document.getElementById('action').value;
    const a = parseInt(document.getElementById('aValue').value);
    const b = parseInt(document.getElementById('bValue').value);
    let inputText = '';

    if (action === 'encode') {
        inputText = document.getElementById('plaintext').value;
    } else {
        inputText = document.getElementById('ciphertext').value;
    }

    const result = affineCipher(inputText, a, b, action === 'encode');
    document.getElementById('result').value = result;
}

function affineCipher(text, a, b, encode = true) {
    const m = 256; // size of the ASCII table
    let result = '';

    function modInverse(a, m) {
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return 1;  // return 1 if there's no inverse
    }

    const a_inv = modInverse(a, m);

    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);

        if (encode) {
            charCode = (a * charCode + b) % m;
        } else {
            charCode = (a_inv * (charCode - b + m)) % m;
        }

        result += String.fromCharCode(charCode);
    }

    return result;
}

function processText3() {
    const action = document.getElementById('action').value;
    const keyword = document.getElementById('vigenereKey').value;
    let inputText = '';

    if (action === 'encode') {
        inputText = document.getElementById('plaintext').value;
    } else {
        inputText = document.getElementById('ciphertext').value;
    }

    if (keyword.length === 0) {
        alert('Vui lòng nhập khóa Vigenere.');
        return;
    }

    const result = vigenereCipher(inputText, keyword, action === 'encode');
    document.getElementById('result').value = result;
}

function vigenereCipher(text, keyword, encode = true) {
    let result = '';
    const keywordLength = keyword.length;
    const asciiSize = 256;  // Size of the ASCII table

    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        let keyCharCode = keyword.charCodeAt(i % keywordLength);

        if (encode) {
            charCode = (charCode + keyCharCode) % asciiSize;
        } else {
            charCode = (charCode - keyCharCode + asciiSize) % asciiSize;
        }

        result += String.fromCharCode(charCode);
    }

    return result;
}

