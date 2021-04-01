<?php
/*
Template Name: Society
*/



$aware_copy1 = get_field('awareness_white_copy');
$aware_copy2 = get_field('awareness_gray_copy');
$lev3title = get_field('level_3_title');
$lev3img = get_field('level_3_image');
$lev3copy = get_field('level_3_copy');
$lev4copy = get_field('level_4_copy');
$fellowship = get_field('fellowship');
$scholarship = get_field('scholarship');
$mcneil_copy = get_field('mcneil_copy');
$mcneil_image = get_field('mcneil_image');
$valleyforge_copy = get_field('valleyforge_copy');
$valleyforge_image = get_field('valleyforge_image');
$game = get_field('rev_game');
?>

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
<div id="main-content" class="society__text">
<style>
.level3BG {
    background-size: cover;
}
</style>
<div id="page-content">
  <div class="subpage__header" style="background-image:url(<?php echo get_site_url() ?>/wp-content/uploads/2020/09/hero.png )">
    <div class="container">
      <h1 class="subpage__header__H1"><?php the_title(); ?></h1>
    </div>
  </div>
    <div class="container">
        <div class="row justify-content-between">

            <div class="col-md-12">
                <?php echo $aware_copy1; ?>

            <?php //get_template_part('includes/loops/content', 'page'); ?>
            </div>
        </div>
    </div>

    <div class="col-md-12 container100">
        <div class="container">
            <?php echo $aware_copy2; ?>
        </div>
            <?php //get_template_part('includes/loops/content', 'page'); ?>
    </div>

    <div class="col-md-12 container100 level3BG" style="background-image:url(<?php echo get_site_url() ?>/wp-content/uploads/2020/10/society_level3_bg.png">
        <div class="container l3">

            <div class="l3__card">
                <img src="<?php echo $lev3img['url']; ?>" alt="<?php echo $lev3title; ?>" class="l3__card__img">
            </div>
            <div class="l3__card">
                <h3 style="color:#fff;"><?php echo $lev3title; ?></h3>
                <div style="color:#fff;" class="l3__card__copy"><?php echo $lev3copy; ?></div>
            </div>
        </div>
            <?php //get_template_part('includes/loops/content', 'page'); ?>
    </div>

    <div class="container l4">
        <div>
            <?php echo $lev4copy; ?>
        </div>

    </div>

    <div class="l5 container100 ">
        <div class="container l5__cards">
            <div class="l5__card">
                <h4>Fellowship</h4>
                <p><?php echo $fellowship; ?></p>
            </div>
            <div class="l5__card">
                <h4>Scholarship</h4>
                <p><?php echo $scholarship; ?></p>
            </div>
        </div>
    </div>

    <div class="l6 contaner100" style="background-image:url(<?php echo get_site_url() ?>/wp-content/uploads/2020/10/l6_bg.png">
        <div class="container">
            <?php echo $game; ?>
        </div>

    </div>

    <div class="l7 container100 ">
        <div class="container l7__cards">
            <div class="l7__card">
                <div class="l7__card_copy">
                <h4>McNeil Center</h4>
                <p><?php echo $fellowship; ?></p>
                </div>
                <div class="l7__card__img__holder">
                    <img src="<?php echo $mcneil_image['url']; ?>" alt="" class="l7__car_img">
                </div>
            </div>
            <div class="l7__card">
            <div class="l7__card_copy">
                <h4>Valley Forge Military Academy</h4>
                <p><?php echo $scholarship; ?></p>
                </div>
                <div class="l7__card__img__holder">
                    <img src="<?php echo $valleyforge_image['url']; ?>" alt="" class="l7__car_img">
                </div>
            </div>
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
