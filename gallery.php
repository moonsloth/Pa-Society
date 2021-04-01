<?php
/* Template Name: Gallery */
?>

<?php get_template_part('includes/header'); ?>

<div id="main-content">

  <div class="container">
    <div class="row justify-content-between">
      <div class="col-md-12">
        <div id="content" role="main">
        <h1><?php the_title(); ?></h1>
          <?php get_template_part('includes/loops/content', 'gallery'); ?>
        </div><!-- /#content -->
      </div>
    
     
    
    </div><!-- /.row -->
  </div><!-- /.container -->

</div>

<?php get_template_part('includes/footer');
?>
