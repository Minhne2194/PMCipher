function decryptCaesar() {
    const cipherText = document.getElementById('cipherText').value;
    let result = '';

    for (let shift = 1; shift <= 25; shift++) {
        let decrypted = '';
        for (let char of cipherText) {
            if (char.match(/[a-zA-Z]/)) {
                const code = char.charCodeAt(0);
                const base = code >= 65 && code <= 90 ? 65 : 97;
                decrypted += String.fromCharCode((code - base - shift + 26) % 26 + base);
            } else {
                decrypted += char;
            }
        }
        result += `Shift ${shift}: ${decrypted}\n`;
    }

    document.getElementById('result').textContent = result;
}

function decryptVigenere() {
    const cipherText = document.getElementById('cipherText').value;
    // Chưa có khóa, chỉ để lại hướng dẫn
    alert("Chức năng giải mã Vigenère yêu cầu khóa. Vui lòng cung cấp khóa để giải mã.");
}
