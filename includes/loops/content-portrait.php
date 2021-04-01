<?php
/*
The Page Loop
=============
*/
?>

<?php if (have_posts()):
	while (have_posts()):

		the_post();

		$image = get_field('image');
		$url = get_field('url');
		$artist = get_field('artist');
		$image_credit = get_field('image_credit');
		?>
		<h1><?php the_title(); ?></h1>

        <div class="portrait">
        <div class="portrait__frame">
            <div class="portrait__img">
                <img src="<?php echo $image[
                	'url'
                ]; ?>" alt="<?php the_title(); ?>" class="portrait__img__source">
            </div>
            <div class="portrait__name">
                <a href="<?php echo $url; ?>"><?php the_title(); ?></a>
            </div>
            <?php if ($artist): ?>
            <div class="portrait__artist">
                by: <?php echo $artist; ?>
            </div>
            
            <?php endif; ?>
            <div class="portrait__credit">
            <?php echo $image_credit; ?>
            </div>
        </div>
            <?php the_content(); ?> 
        </div>
		
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
