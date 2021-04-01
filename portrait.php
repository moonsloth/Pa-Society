<?php
/* Template Name: Portrait */
?>

<?php get_template_part('includes/header'); ?>
<style>
.navbar {
    background-color: #7f7f7f !important;
    z-index: 100;
}
</style>
<div id="main-content">

  <div class="container">
    <div class="row justify-content-between">
      <div class="col-md-9">
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
