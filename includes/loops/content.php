<?php
/*
The Default Loop (used by index.php and category.php)
=====================================================

If you require only post excerpts to be shown in index and category pages, then use the [---more---] line within blog posts.

If you require different templates for different post types, then simply duplicate this template, save the copy as, e.g. "content-aside.php", and modify it the way you like it. (The function-call "get_post_format()" within index.php, category.php and single.php will redirect WordPress to use your custom content template.)

Alternatively, notice that index.php, category.php and single.php have a post_class() function-call that inserts different classes for different post types into the <section> tag (e.g. <section id="" class="format-aside">). Therefore you can simply use e.g. .format-aside {your styles} in css/be_theme.css style the different formats in different ways.
*/
?>

<?php if(have_posts()): while(have_posts()): the_post();?>
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

<?php the_excerpt(); ?>

</div>
</div>
<?php endwhile; ?>

<?php if ( function_exists('be_theme_pagination') ) { be_theme_pagination(); } else if ( is_paged() ) { ?>
  <ul class="pagination">
    <li class="older"><?php next_posts_link('<i class="glyphicon glyphicon-arrow-left"></i> ' . __('Previous', 'be_theme')) ?></li>
    <li class="newer"><?php previous_posts_link(__('Next', 'be_theme') . ' <i class="glyphicon glyphicon-arrow-right"></i>') ?></li>
  </ul>
<?php } ?>
<?php else: wp_redirect(get_bloginfo('siteurl').'/404', 404); exit; endif; ?>
