document.addEventListener('DOMContentLoaded', function(){
    const editor = document.querySelector('.johannes-editor');

    if(editor){
        let blocks = editor.querySelectorAll('.draggable-block');

        if(blocks.length == 1){

            const p = blocks[0].querySelector('.johannes-content-element'); 
            if(p.innerText == ''){
                p.focus();
            }
        }
    }
});