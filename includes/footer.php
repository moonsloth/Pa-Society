
<?php
$logo = get_field('logo_light', 'options');
$tagline = get_field('tagline', 'options');
$footerCopy = get_field('small_footer_copy', 'options');
$footerCta1 = get_field('footer_callout_1', 'options');
$footerCta2 = get_field('footer_callout_2', 'options');
?>


<footer class="container100">
<div class="container100 blueBG ">

<div class="container footerCTA">
  <div class="footCTA__holder footerCTA__join">
    <div class="footerCTA__title">Join The State Society of the Cincinnati of Pennsylvania</div>
    <div class="footerCTA__text"><?php echo $footerCta1; ?></div>
    <a href="<?php get_site_url(); ?>/join-now/" class="btn-white">Learn More</a>
  </div>
  <div class="footCTA__holder footerCTA__apply">
    <div class="footerCTA__title">Apply for a Grant</div>
    <div class="footerCTA__text"><?php echo $footerCta2; ?></div>
    <a href="<?php get_site_url(); ?>/apply-for-a-grant/" class="btn-white">Learn More</a>
  </div>
</div>

</div>



<div class="container footerbottom">
<div class="footerbottom__holder">
  <div class="logo_group">
        <a class="navbar-brand" href="<?php bloginfo('url'); ?>"><?php if (
	$logo != ''
) {
	echo '<img src="' .
		$logo['url'] .
		'" class="img-fluid " alt="' .
		get_bloginfo('name') .
		'" />';
} else {
	bloginfo('name');
} ?></a>
        <div class="tagline"><?php echo $tagline; ?></div>
    </div>
    <div class="footer__line"></div>
    <span><?php echo $footerCopy; ?></php></span>
</div>
  <div class="footerbottom__holder footer__holder--quicklink">
    <div class="footerbottom__menu">
      <h4 class="footerbottom__h3">Quick Links</h4>
      <div class="footer__line"></div>

      <?php wp_nav_menu(['theme_location' => 'footer']); ?>  
    </div>
  </div>

</div>
  <div class="copyright container100">
    <p>Copyright &copy; <?php bloginfo('name'); ?>&nbsp;<?php echo date(
	'Y'
); ?>The State Society of the Cincinnati of Pennsylvania | Site by beMarketing</p>
  </div>
  
</footer>
<?php wp_footer(); ?>

<script type="text/javascript">
;(function ($) {

	
	"use strict";
  var mq = window.matchMedia('(min-width: 768px)');
  if (mq.matches) {
    $('ul.navbar-nav > li').addClass('hovernav');
  } else {
    $('ul.navbar-nav > li').removeClass('hovernav');
  }
  // The addClass/removeClass also needs to be triggered on page resize <=> 768px
  function WidthChange(mq) {
    if (mq.matches) {
      $('ul.navbar-nav > li').addClass('hovernav');
    } else {
      $('ul.navbar-nav > li').removeClass('hovernav');
    }
  }
  if (matchMedia) {
    var mq = window.matchMedia('(min-width: 768px)');
    mq.addListener(WidthChange);
    WidthChange(mq);
  }
  }(jQuery));
;

</script>
</body>
</html>