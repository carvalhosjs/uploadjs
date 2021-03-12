    var resize = new window.resize();
    resize.init();

    var imagens;
    var imagem_atual;



    $(function($) {

        const options = { width: 200 };
        $("#imagem").on("change", function() {
            enviar(options, function(result) {
                $("#url").val(result);
            });
        })

    })


    function enviar(options, cb) {
        // Verificando se o navegador tem suporte aos recursos para redimensionamento
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert('O navegador não suporta os recursos utilizados pelo aplicativo');
            return;
        }

        imagens = $("#imagem")[0].files;

        if (imagens.length > 0) {

            $('#progresso').attr('aria-valuenow', 0).css('width', '0%');
            // Escondendo campo de imagem
            $('#imagem').hide();
            // Iniciando redimensionamento
            imagem_atual = 0;
            redimensionar(options, function(e) {
                cb(e)
            });


        }


    }

    /*
    Redimensiona uma imagem e passa para a próxima recursivamente
    */
    function redimensionar(options = {}, cb) {

        let docs = [];
        const width = options.width || 640;
        const url = options.url || "ajax.php";
        // Se redimensionado todas as imagens
        if (imagem_atual > imagens.length) {
            // Definindo progresso de finalizado
            $('#progresso').html('Imagen(s) enviada(s) com sucesso');
            // Limpando imagens
            limpar();
            // Exibindo campo de imagem
            $('#imagem').show();
            // Finalizando
            return;
        }
        // Se não for um arquivo válido
        if ((typeof imagens[imagem_atual] !== 'object') || (imagens[imagem_atual] == null)) {
            // Passa para a próxima imagem
            imagem_atual++;
            redimensionar();
            return;
        }
        // Redimensionando
        resize.photo(imagens[imagem_atual], width, 'dataURL', function(imagem) {
            // Salvando imagem no servidor
            $.post(url, { imagem: imagem }, function(e) {

                docs.push(e);
                // Definindo porcentagem
                var porcentagem = (imagem_atual + 1) / imagens.length * 100;
                // Atualizando barra de progresso
                $('#progresso').text(Math.round(porcentagem) + '%').attr('aria-valuenow', porcentagem).css('width', porcentagem + '%');
                // Aplica delay de 1 segundo
                // Apenas para evitar sobrecarga de requisições
                // e ficar visualmente melhor o progresso
                setTimeout(function() {
                    // Passa para a próxima imagem
                    imagem_atual++;
                    redimensionar(options, function(next) {
                        cb(next);
                    });


                }, 1000);

                cb(docs);
            });
        });


    }

    /*
    Limpa os arquivos selecionados
    */
    function limpar() {
        var input = $("#imagem");
        input.replaceWith(input.val('').clone(true));
    }