<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Cadastro de Foto</title>
    <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/canvas-to-blob.min.js"></script>
    <script src="js/resize.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
</head>
<body>
<div class="container">
    <h1>Cadastro de Foto</h1>
    <form action="upload.php" method="post" action="#" role="form">
        <div class="progress">
            <div id="progresso" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0"
                 aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
        </div>
        <div class="form-group row">
            <div class="col-xs-6">
                <input type="text" name="url" class="form-control" id="url">
            </div>
            <div class="col-xs-6">
                <input id="imagem" type="file" accept="image/*"/>
            </div>
        </div>

        <br>
        <button>Salvar</button>
    </form>
</div>
<script src="js/uploader.js"></script>
</body>


</html>