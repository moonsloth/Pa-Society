<?php get_template_part('includes/header'); ?>

<div id="main-content">

  <div class="container">
    <div class="row justify-content-between">
      <div class="col-md-12">
        <div id="content" role="main">
          <?php get_template_part('includes/loops/content', 'portrait'); ?>
        </div><!-- /#content -->
      </div>
    
<!--       <div class="col-md-3 sidebar">
        <div class="sidebar__menu">
          <h4 class="sidebar__h3">Quick Links</h4>
            <div class="sidebar__line"></div>
                <?php wp_nav_menu(['theme_location' => 'nav-left']); ?>  
            </div>
            <?php get_template_part('includes/sidebar', 'page'); ?>
        </div>
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
