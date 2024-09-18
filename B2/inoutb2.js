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

function processText4() {
    const action = document.getElementById('action').value;
    const matrix = [
        [parseInt(document.getElementById('matrix00').value), parseInt(document.getElementById('matrix01').value)],
        [parseInt(document.getElementById('matrix10').value), parseInt(document.getElementById('matrix11').value)]
    ];
    let inputText = '';

    if (action === 'encode') {
        inputText = document.getElementById('plaintext').value;
    } else {
        inputText = document.getElementById('ciphertext').value;
    }

    const result = hillCipher(inputText, matrix, action === 'encode');
    document.getElementById('result').value = result;
}

function hillCipher(text, matrix, encode = true) {
    let result = '';
    const blockSize = matrix.length;

    // Ensure text length is a multiple of block size
    if (text.length % blockSize !== 0) {
        text = padText(text, blockSize);
    }

    // Process text in blocks of blockSize
    for (let i = 0; i < text.length; i += blockSize) {
        const block = text.slice(i, i + blockSize);
        const vector = block.split('').map(char => char.charCodeAt(0));

        const newVector = multiplyMatrix(matrix, vector, encode);

        result += newVector.map(num => String.fromCharCode(num % 256)).join('');
    }

    return result;
}

function multiplyMatrix(matrix, vector, encode) {
    let result = [];

    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            sum += matrix[i][j] * vector[j];
        }
        result[i] = encode ? sum : modInverse(sum, 256); // Optional inverse for decoding
    }

    return result;
}

function padText(text, blockSize) {
    const padLength = blockSize - (text.length % blockSize);
    return text + ' '.repeat(padLength);  // Pad with spaces
}

function modInverse(n, mod) {
    for (let x = 1; x < mod; x++) {
        if ((n * x) % mod === 1) {
            return x;
        }
    }
    return 1; // Return 1 if no inverse found
}

