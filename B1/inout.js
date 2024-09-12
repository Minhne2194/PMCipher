
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

    function processText() {
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

    