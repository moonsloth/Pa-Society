<!DOCTYPE html>
<html class="no-js">
<head>

	<title><?php bloginfo('title'); ?> | <?php the_title(); ?></title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;400;500;700&display=swap" rel="stylesheet">

    <?php wp_head(); ?> 
</head>

<body class="<?php if (is_page('home')) {
	echo 'home';
} else {
	echo 'page';
} ?>">


 
<!--[if lt IE 8]>
<div class="alert alert-warning">
	You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.
</div>
<![endif]-->
<?php
$logo = get_field('logo_light', 'options');
$tagline = get_field('tagline', 'options');
?>
<div id="main-header">
<div class="container100">

<div id="header-logo" class="blueBG"> 
	<div class="container headerflex">
  <div class="logo_group">
      <a class="navbar-brand" href="<?php bloginfo('url'); ?>"><?php if (
	$logo != ''
) {
	echo '<img src="' .
		$logo['url'] .
		'" class="img-fluid " alt="' .
		get_bloginfo('name') .
		'" />';
} else {
	bloginfo('name');
} ?></a>
      <div class="tagline"><?php echo $tagline; ?></div>
  </div>

  <div class="top-nav">
    <a href="<?php get_site_url(); ?>/grants/" class="btn-white">APPLY FOR A GRANT</a>
    <a href="<?php get_site_url(); ?>/membership-login/" class="btn-white">MEMBERS AREA</a>
  </div>
  </div>
</div>

<nav class="navbar navbar-expand-lg">
<div class="container" style="position:relative">
  
  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon">&nbsp;</span>
  </button>

  <div class="collapse navbar-collapse" id="main-nav">
    <?php
    $navbar = wp_nav_menu([
    	'theme_location' => 'primary',
    	'echo' => false,
    	'depth' => 2, // 1 = no dropdowns, 2 = with dropdowns.
    	'container' => 'div',
    	'container_class' => 'navbar-collapse',
    	'container_id' => 'bs-example-navbar-collapse-1',
    	'menu_class' => 'navbar-nav ml-auto',
    	'fallback_cb' => 'WP_Bootstrap_Navwalker::fallback',
    	'walker' => new WP_Bootstrap_Navwalker(),
    ]);

    echo $navbar;
    ?>
	
	
    
  </div>
	

  <form class="search" role="search" method="get" id="" action="<?php echo home_url(
  	'/'
  ); ?>">
			<div class="search__wrapper">
				<input type="text" class="search__field" placeholder="Search..." name="s">
				<button type="submit" id="" class="fa fa-search search__icon"></button>
			</div>
		</form>
  </div>
</nav>
 
		
 
</div> <!-- end navflex -->
</div>
