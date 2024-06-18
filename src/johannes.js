// Remove pest text style
document.addEventListener('DOMContentLoaded', function () {
        
    document.body.addEventListener('paste', function (e) {
        if (e.target.getAttribute('contenteditable') === 'true') {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text/plain');
            document.execCommand('insertText', false, text);  // Inset text without style
        }
    });
});
// End remove pest text style