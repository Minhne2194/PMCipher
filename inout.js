function performOperation() {
    const inputText = document.getElementById('inputText').value;
    const key = parseInt(document.getElementById('key').value);
    const operation = document.getElementById('operation').value;

    if (isNaN(key) || key < 0 || key > 255) {
        alert('Vui lòng nhập khóa hợp lệ từ 0 đến 255');
        return;
    }

    const resultText = (operation === 'encode') ? caesarCipher(inputText, key) : caesarCipher(inputText, -key);
    document.getElementById('resultText').value = resultText;
}

function caesarCipher(str, shift) {
    return str.split('').map(char => {
        let code = char.charCodeAt(0);
        // Dịch ký tự ASCII
        let shiftedCode = ((code + shift) % 256 + 256) % 256;
        return String.fromCharCode(shiftedCode);
    }).join('');
}
document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('inputText').value = e.target.result;
    };
    reader.readAsText(file);
}
