<?php
/*
The Page Loop
=============
*/
?>

<div class="row">
<div class="col-md-6">
	<h3>Pages</h3>
	<hr>
<ul>
<?php wp_list_pages('title_li='); ?>
</ul>
</div>
<div class="col-md-6">
<h3>Posts</h3>
<hr>
<ul>
<?php // WP_Query arguments
$args = array(
	'posts_per_page'         => '-1',
);

// The Query
$query = new WP_Query( $args );

// The Loop
if ( $query->have_posts() ) {
	while ( $query->have_posts() ) {
		$query->the_post(); ?>
<li><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></li>
<?php }
} else {
	// no posts found
} 
wp_reset_postdata(); 
?>
</ul>
</div>
</div>
