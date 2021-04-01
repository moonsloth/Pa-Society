
<?php
$posts = get_posts([
	'posts_per_page' => -1,
	'post_type' => 'gallery_post',
	'meta_key'			=> 'last_name',
	'orderby'			=> 'meta_value',
	'order'				=> 'ASC'
]);

if ($posts): ?>
	
	<div class="be--gallery">
		
	<?php foreach ($posts as $post):

 	setup_postdata($post);
 	$picture = get_field('image');
 	?>
		<a href="<?php the_permalink(); ?>">
            <div class="be--gallery__frame">
                <div class="be--gallery__frame__pic" style="background-image:url(<?php echo $picture[
                	'url'
                ]; ?>)"></div>
                <div class="be--gallery__frame__title"><?php the_title(); ?></div>
                <?php
 	//var_dump($post);
 	?>
                
            </div>
        </a>
	
	<?php
 endforeach; ?>
	
	</div>
	
	<?php wp_reset_postdata(); ?>

<?php endif;
?>

