<?php
$to = 'kent_sam@outlook.com';
$subject = "Sam-Antics - Contact Request";

$email = $_POST["email"];
$title = $_POST["title"];
$comments = $_POST["comments"];

$headers = 'From: admin@sam-antics.co.uk' . "\r\n" . 'Reply-To: ' . $email ;
$message = "Title: " . "\r\n" . $title . "\r\n" . "\r\n" . "Message Contents: " . "\r\n" . $comments;


mail($to, $subject, $message, $headers);
?>

<head>
    <!--
        Site written by Samuel Kent as a personal site.
        Started on the 29th December 2019.
        (Unfinished)
    -->

    <!-- Tab title and icon. -->
    <title>Sam Antics</title>
    <link rel="icon" href="Images/icon.png">

    <!-- Meta Information for the site. -->
    <meta name="author" content="Samuel Kent">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">

    <!-- SVG to hide site till it loads -->
    <svg id="screen-cover" width="100%" height="100%" style="position:absolute;z-index:1;bottom:0px;">
        <rect width="100%" height="100%" style="fill:rgb(0,0,0);" />
    </svg>

    <!-- Link to the stylesheet and javascript. -->
    <link rel="stylesheet" href="/styles.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="/animation-script.js"></script>
    <script type="text/javascript" src="/page-load-script.js"></script>
</head>

<!-- All the displayed HTML is in here -->

<svg id="animation-dump" width="100%" height="100%">
    <line x1="0" y1="0" x2="0" y2="0" class="line"/>
</svg>

<body>
    <header onclick="window.location.href = '/index.php';">
        Sam Antics
    </header>

    <div id="site-dump">
        <!-- The contents of loaded sites are dumped here. -->
    </div>

    <main>
        <section>
            Your message has been sent, I usually respond within 12 hours though please allow up to 5 days.
        </section>

        <div class="float">
            <span id="about-me">
            </span>
        </div>
        <div class="float">
            <span id="university-work">
            </span>
        </div>
        <div class="float">
            <span id="personal-projects">
            </span>
        </div>
        <div class="unfloat">
            <!-- To float left so other bits don't -->
        </div>
    </main>

    <footer>
        
    </footer>
</body>

</html>
