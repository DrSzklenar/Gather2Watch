<?php

require("dependencies/curl.php");

$searchWord = $_GET["search"];


$searchQuery = 'fields *,game.*,game.cover.*;where game.follows > 4; search "'.$searchWord.'"; limit 50;';
$searchUrl = "https://api.igdb.com/v4/search";
$CurledSearch = getData($searchUrl, $searchQuery);

$search_results = json_decode($CurledSearch);


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/search.css">
    <link rel="stylesheet" href="css/navbar.css">
    <title>Document</title>
</head>

<body>
    <?php include("dependencies/navbar.php"); ?>

    <div class="searchResults">
        <h2>Search for: <?php echo $searchWord ?></h2>
        <div id="wrapper" class="container card-content">

            <?php
            foreach ($search_results as $result) {
                echo "<div class=\"card\">";
                echo    "<a href=\"game.php?id=".$result->game->cover->id."&gameid=".$result->game->cover->game."\"class=\"IdProperty\"></a>";
                echo   
                        "<div class=\"card-body\"> ";
                echo        "<img loading=\"lazy\" src=\"https://" . str_replace("t_thumb", "t_cover_big", $result->game->cover->url) . "\">";
                echo    "</div>

                      <div class=\"card-header\">";
                echo        "<h3>" . $result->name . "</h3>";
                echo    "</div>
                    </div>";
            }
            ?>
        </div>
    </div>

</body>

</html>