<?php
/*
The Page Loop
=============
*/
?>

<?php if (have_posts()):
	while (have_posts()):
		the_post(); ?>
		
		<?php the_content(); ?>
		<?php wp_link_pages(); ?>
		<?php
	endwhile;
else:
	 ?>
	<?php wp_redirect(get_bloginfo('siteurl') . '/404', 404); ?>
	<?php exit(); ?>
<?php
endif; ?>
 <?php if (is_page('site-map')) {
 	get_template_part('includes/loops/content', 'site-map');
 } ?>
