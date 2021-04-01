<?php
/*
The Single Posts Loop
=====================
*/
?> 

<?php if(have_posts()): while(have_posts()): the_post(); ?>
<?php
$thumb_id = get_post_thumbnail_id();
$thumb_url_array = wp_get_attachment_image_src($thumb_id, 'thumbnail-size', true);
$thumb_url = $thumb_url_array[0];
$base = get_bloginfo('url');
$template = get_bloginfo('template_directory');
?>
<div class="entry">
<div class="entry-image col-12 col-md-4">

<?php if($thumb_url == $base . '/wp-includes/images/media/default.png'){ ?>
<img src="<?php echo $template . '/screenshot.png'; ?>" alt="<?php the_title(); ?>" class="alignleft img-fluid" />
<?php }else{ ?>
<img src="<?php echo $thumb_url; ?>" alt="<?php the_title(); ?>" class="alignleft img-fluid" />
<?php } ?>
    
</div>
<div class="entry-content col-12 col-md-8">

<h2><a href="<?php the_permalink(); ?>"><?php the_title()?></a></h2>
<h4><time  class="text-muted" datetime="<?php the_time('d-m-Y')?>"><?php the_time('F jS, Y') ?></time></h4>

<?php the_content(); ?>

</div>
</div>

<?php endwhile; ?>
<?php else: ?>
<?php wp_redirect(get_bloginfo('siteurl').'/404', 404); exit; ?>
<?php endif; ?>
