

export function isTriggable(event) {
    // Verifica se o target ou qualquer ancestral tem a classe 'key-trigger'
    return event.target.closest('.key-trigger') !== null;
}