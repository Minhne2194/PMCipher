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

function findRepeatingSequences() {
    const cipherText = document.getElementById('cipherText').value;
    const sequences = {};
    const length = cipherText.length;

    for (let seqLength = 3; seqLength <= 5; seqLength++) {
        for (let i = 0; i <= length - seqLength; i++) {
            const seq = cipherText.substring(i, i + seqLength);
            if (!sequences[seq]) sequences[seq] = [];
            sequences[seq].push(i);
        }
    }

    let result = '';
    for (const seq in sequences) {
        if (sequences[seq].length > 1) {
            result += `Chuỗi "${seq}" xuất hiện tại: ${sequences[seq].join(', ')}\n`;
        }
    }

    if (result === '') {
        result = 'Không tìm thấy chuỗi lặp lại.';
    }

    document.getElementById('result').textContent = result;
}
