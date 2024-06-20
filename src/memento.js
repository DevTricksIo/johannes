// Pilhas para undo e redo
let undoStack = [];
let redoStack = [];



document.addEventListener('DOMContentLoaded', function () {
    // Elemento do editor
    const editor = document.querySelector('.content');

    if (editor) {
        // Evento para detectar mudanças e salvar o estado antes de mudar
        editor.addEventListener('input', () => {
            saveState();
        });

        // Função para salvar o estado atual do editor
        function saveState() {
            // Clone do conteúdo atual do editor
            const currentState = editor.innerHTML;
            undoStack.push(currentState);
        }
        
        // Função para desfazer
        function undo() {
            if (undoStack.length > 0) {
                const stateToRestore = undoStack.pop();
                redoStack.push(editor.innerHTML);
                editor.innerHTML = stateToRestore;
            }
        }

        // Função para refazer
        function redo() {
            if (redoStack.length > 0) {
                const stateToApply = redoStack.pop();
                undoStack.push(editor.innerHTML);
                editor.innerHTML = stateToApply;
            }
        }

        // Adicionando eventos de teclado para undo e redo
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'z') {
                undo();
                event.preventDefault();
            } else if (event.ctrlKey && event.key === 'y') {
                redo();
                event.preventDefault();
            }
        });

        // Inicializar o estado do editor
        saveState();
    }
});






