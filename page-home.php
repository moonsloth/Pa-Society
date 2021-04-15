<?php
/*
Template Name: Homepage
*/
?>
<?php get_template_part('includes/header'); ?>
<main role="main">

<!-- Main jumbotron for a primary marketing message or call to action -->
<div class="jumbotron">
  <div class="container">
    <?php add_revslider('slider-1', 'homepage'); ?>
  </div>
</div>

<?php
$ctaImg1 = get_field('hp_cta_1', 'option');
$ctaImg2 = get_field('hp_cta_2', 'option');
$ctaImg3 = get_field('hp_cta_3', 'option');
$ctaImg4 = get_field('hp_cta_4', 'option');
$ctaTxt1 = get_field('hp_cta1_text', 'option');
$ctaTxt2 = get_field('hp_cta2_text', 'option');
$ctaTxt3 = get_field('hp_cta3_text', 'option');
$ctaTxt4 = get_field('hp_cta4_text', 'option');
$aboutImg = get_field('hp_about_img', 'option');
$aboutTxt = get_field('hp_about_copy', 'option');
$revImg = get_field('hp_rev_hero', 'option');
$revCtaImg1 = get_field('rev_cta_1', 'option');
$revCtaImg2 = get_field('rev_cta_2', 'option');
$revCtaImg3 = get_field('rev_cta_3', 'option');
?>

<section id="cta">


<div class="container">
  <!-- Example row of columns -->
  <div class="row">
    <div class="col-md-3">
      <a href="<?php get_site_url(); ?>/Names/namelist.html" class="homebtn">
        <div id="cta1" class="cta" style="background-image: url(<?php echo $ctaImg1[
        	'url'
        ]; ?>)">
        <div class="cta__title">The American Revolution</div>
        <div class="cta__text"><?php echo $ctaTxt1; ?></div>

      </div>
      </a>
    </div>
    <div class="col-md-3 cta__box">
      <a href="<?php echo get_site_url(); ?>/about" class="homebtn">
        <div id="cta2" class="cta" style="background-image: url(<?php echo $ctaImg2[
        	'url'
        ]; ?>)">
        <div class="cta__title">About Us</div>
        <div class="cta__text"><?php echo $ctaTxt2; ?></div>

      </div>
      </a>
    </div>
    <div class="col-md-3">
    <a href="<?php get_site_url(); ?>/members-area/" class="homebtn">
        <div id="cta3" class="cta" style="background-image: url(<?php echo $ctaImg3[
        	'url'
        ]; ?>)">
        <div class="cta__title">Members Area</div>
        <div class="cta__text"><?php echo $ctaTxt3; ?></div>

      </div>
      </a>
    </div>
    <div class="col-md-3">
      <a href="<?php get_site_url(); ?>/join-now/" class="homebtn">
        <div id="cta4" class="cta" style="background-image: url(<?php echo $ctaImg4[
        	'url'
        ]; ?>)">
        <div class="cta__title">Join the society</div>
        <div class="cta__text"><?php echo $ctaTxt4; ?></div>

      </div>
      </a>
    </div>
  </div>

</section>

</div> <!-- /container -->

<section id="about">

<div class="container100 about">
  <div class="container50 about__art"  style="background-image: url(<?php echo $aboutImg[
  	'url'
  ]; ?>)">
    <div class="container50 about__art__copy">Washington's farewell at Fraunces Tavern</div>
  </div>
  <div class="container50 about__text">
    <div class="about__text__holder">
      <h2 class='about__text__h2'>About</h2>
      <?php echo $aboutTxt; ?>

      <a href="<?php echo get_site_url(); ?>/about" class="btn about__text__btn">LEARN MORE</a>
    </div>

  </div>

</div>


</section>

<section id="rev">

<div class="container100 rev" style="background-image: url(<?php echo $revImg[
	'url'
]; ?>)">
  <h3>The American Revolution</h3>
  <a href="<?php echo get_site_url(); ?>/Names/namelist.html" class="rev__cta">
    <div class="rev__cta__img" style="background-image: url(<?php echo $revCtaImg1[
    	'url'
    ]; ?>)"></div>
  </a>

  <a href="<?php echo get_site_url(); ?>/Names/namelist.html" class="btn rev__btn">LEARN MORE</a>

  <a href="<?php echo get_site_url(); ?>/unit-list/Unitslist.html" class="rev__cta">
    <div class="rev__cta__img" style="background-image: url(<?php echo $revCtaImg2[
    	'url'
    ]; ?>)"></div>
  </a>

  <a href="<?php echo get_site_url(); ?>/unit-list/Unitslist.html" class="btn rev__btn">LEARN MORE</a>

  <a href="<?php echo get_site_url(); ?>/Battles/battles.html" class="rev__cta">
    <div class="rev__cta__img" style="background-image: url(<?php echo $revCtaImg3[
    	'url'
    ]; ?>)"></div>
  </a>

  <a href="<?php echo get_site_url(); ?>/Battles/battles.html" class="btn rev__btn">LEARN MORE</a>

  <a href="<?php echo get_site_url(); ?>/american-revolution" class="btn rev__btn--big">Explore MORE</a>
</div>


</section>

<section id="portraits">

<div class="container100 gallery">
<h2>Portrait Gallery</h2>

  <section class="regular slider">

  <?php
  $posts = get_posts([
    'posts_per_page' => -1,
    'post_type' => 'gallery_post',
    'meta_key'			=> 'last_name',
    'orderby'			=> 'meta_value',
    'order'				=> 'ASC'
  ]);
  if ($posts): ?>

<?php foreach ($posts as $post):

	setup_postdata($post);
	//$picture = get_field('image');
	$image = get_field('image');
	$link = get_sub_field('portrait_url');
	?>

    <a href="<?php the_permalink(); ?>">
      <div class="gallery__holder">
        <img src="<?php echo $image['url']; ?>" class="gallery__pic">
        <div class="gallery__text"><?php the_title(); ?></div>
      </div>
  </a>


    <?php
endforeach; ?>

<?php endif;
  ?>

  </section>

</div>



</section>


<section id="id">

<div class="container100 contact" style="background-image: url(<?php echo get_site_url(); ?>/wp-content/uploads/2020/09/contact_bg.png)">
<div class="container contact__container">
  <div class="contact__email">
    <h3 class="contact__h3">Email</h3>
    <a class="" href="mailto:society@pasocietyofthecincinnati.org">society@pasocietyofthecincinnati.org</a>
    <h3 class="contact__h3">GET IN TOUCH</h3>
  <?php gravity_form(1, false, false, false, '', false); ?>
  </div>
  <!-- <div class="contact__form">
  <h3 class="contact__h3">GET IN TOUCH</h3>
  <?php gravity_form(1, false, false, false, '', false); ?>
  </div> -->
</div>
</div>

</section>




</main>

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
          $('.jumbotron').css('margin-top', '0px');

        }else{
          $('.jumbotron').css('margin-top', '-55px');
        }
      }



      var slideCnt = 3;

      if (document.documentElement.clientWidth> 414) {
        slideCnt = 6;

      };


      $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: slideCnt,
        slidesToScroll: slideCnt
      });

    });
  }(jQuery));

  let slickPic = document.getElementsByClassName("gallery__holder");





</script>

<?php get_template_part('includes/footer'); ?>
