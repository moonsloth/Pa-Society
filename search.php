<?php get_template_part('includes/header'); ?>

<div class="container">
  <div class="row">
    
    <div class="col-xs-12 col-sm-8">
      <div id="content" role="main">
        <h2 class="search__h2"><?php _e(
        	'Search Results for',
        	'be_theme'
        ); ?> &ldquo;<?php the_search_query(); ?>&rdquo;</h2>
        <hr/>
        <?php get_template_part('includes/loops/content', 'search'); ?>
      </div><!-- /#content -->
    </div>
    
    <div class="col-xs-6 col-sm-4" id="sidebar" role="navigation">
    <h4 class="sidebar__h3">Quick Links</h4>
            <div class="sidebar__line"></div>
                <?php wp_nav_menu(['theme_location' => 'nav-left']); ?>  
            </div>
            <?php get_template_part('includes/sidebar', 'page'); ?>
        </div>
    </div>
    
  </div><!-- /.row -->
</div><!-- /.container -->

<?php get_template_part('includes/footer');
?>
