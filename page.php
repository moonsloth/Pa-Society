<?php get_template_part('includes/header'); ?>
<?php get_template_part('includes/page', 'header'); ?>
<?php
$vc_enabled = get_post_meta($post->ID, '_wpb_vc_js_status', true) === 'true';
if ($vc_enabled == true) { ?>

<div id="main-content">
<div id="page-content">
<div class="container">
<?php get_template_part('includes/loops/content', 'page'); ?>
</div>
</div>
</div>
<?php } else { ?>
<div id="main-content">
<div id="page-content">
  <div class="subpage__header" style="background-image:url(<?php echo get_site_url() ?>/wp-content/uploads/2020/09/hero.png )">
    <div class="container">
      <h1 class="subpage__header__H1"><?php the_title(); ?></h1>
    </div>
  </div>
  <div class="container">
    <div class="row justify-content-between">
   
        <div class="col-md-12">
          <?php get_template_part('includes/loops/content', 'page'); ?>
        </div>
        <!-- <div class="col-md-3 sidebar">
          
          <div class="sidebar__menu">
          <h4 class="sidebar__h3">Quick Links</h4>
            <div class="sidebar__line"></div>
                <?php wp_nav_menu(['theme_location' => 'nav-left']); ?>  
            </div>
            <?php get_template_part('includes/sidebar', 'page'); ?>
        </div> -->

       
      
    </div>
   
  </div>

</div>
</div>
<?php }
?>


<script type="text/javascript">
;(function ($) {

	
	"use strict";
    document.addEventListener('DOMContentLoaded', function () {

      $('.navbar-toggler').click(function(){
        clickedIt();
      });

      function clickedIt() {  
        let canSee = $("#main-nav").is(":visible");

        if(canSee == false){
          $('.subpage__header').css('margin-top', '-20px');
          
        }else{
          $('.subpage__header').css('margin-top', '-75px');
        }
      }

    
    });
  }(jQuery));
</script>
<style>
.navbar {
    background-color: #7f7f7f !important;
}
</style>
<?php get_template_part('includes/footer'); ?>
