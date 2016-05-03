$(document).ready(function() {

    var chat_input = $('#chat_input');
    var record = $('#record');
    
    function show_message(who, message, outof) {
        
        $('#typing').remove();
        
        var message = '<p><span class="name">' + who + '</span>: ' + message;
        if (outof != null) {
            message += '<br /><span class="outof">(out of ' + outof + ' responses)</span>';
        }
        message += '</p>';
        
        message = $(message);
        
        //Add the message
        record.append(message);
        
        //Scroll down
        record.animate({
            scrollTop: message.offset().top + record.scrollTop()
        }, 300);
    }
    
    function typing() {
        var message = '<p id="typing">Typing...</p>';
        message = $(message);
        
        //Add the message
        record.append(message);
        
        //Scroll down
        record.animate({
            scrollTop: message.offset().top + record.scrollTop()
        }, 300);
    }
    
    function submit_chat() {
        var chat_text = chat_input.val();
        chat_text = $.trim(chat_text);
        if (chat_text.length == 0)
            return;
        
        chat_input.val('');
        
        show_message('Me', chat_text);
        
        typing();
        
        var corpus_id = $('#corpus_id').val();
        $.post('question.html', 
        {
            message: chat_text,
            corpus_id: corpus_id
        },
        function(data) {
            show_message(data.who, data.message, data.outof);
        }, 
        'json');
    }
    
    $('#send_button').click(function() {
        submit_chat();
    });
    
    $('#chat_input').keydown(function(event) {
        if (event.which == 13) {//enter
            submit_chat();
            return false;
        }
    });
    
});

