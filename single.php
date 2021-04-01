<?php get_template_part('includes/header'); ?>

<div id="main-content">

  <div class="container">
    <div class="row justify-content-between">
      <div class="col-md-12">
        <div id="content" role="main">
          <?php get_template_part('includes/loops/content', 'single'); ?>
        </div><!-- /#content -->
      </div>
    
      <!-- <div class="col-md-3 sidebar">
          <?php get_template_part('includes/sidebar'); ?>
      </div> -->
    
    </div><!-- /.row -->
  </div><!-- /.container -->

</div>
<style>
.navbar {
    background-color: #7f7f7f !important;
    z-index: 100;
}
</style>
<?php get_template_part('includes/footer');
?>

