<?php
/*
The Page Loop
=============
*/
?>
<?php add_revslider('home-default'); ?>
<div id="mission">
<div class="container">
<div class="row">
<div class="col-md-12">
<?php 
$missionSub = get_field('mission_sub_title');
$missionTitle = get_field('mission_title');
$missionContent = get_field('mission_content');
$missionLinkOneUrl = get_field('mission_link_one_url');
$missionLinkOneTitle = get_field('mission_link_one_title');
$missionLinkTwoUrl = get_field('mission_link_two_url');
$missionLinkTwoTitle = get_field('mission_link_two_title');
$missionSig = get_field('mission_signature');
$missionName = get_field('mission_name');
$missionJob = get_field('mission_job');
?>
<h5 class="text-center"><?php echo $missionSub; ?></h5>
<h2 class="text-center"><?php echo $missionTitle; ?></h2>
<div class="mission-content"><?php echo $missionContent; ?></div>
<div class="text-center">
<div class="btn-group" role="group" aria-label="Mission Links">
  <a href="<?php echo $missionLinkOneUrl; ?>" class="btn btn-primary"><?php echo $missionLinkOneTitle; ?></a>
  <a href="<?php echo $missionLinkOneUrl; ?>" class="btn btn-secondary"><?php echo $missionLinkTwoTitle; ?></a>
</div>
</div>
<img src="<?php echo $missionSig['url']; ?>" alt="<?php echo $missionSig['alt']; ?>" class="aligncenter img-fluid" />
<p class="text-center"><?php echo $missionName; ?> - <em><?php echo $missionJob; ?></em></p>
</div>
</div>
</div>
</div>
<div id="stats" class="parallax">
<div class="container">
<div class="row">
<div class="col-md-12">
<h2 class="text-center">Our Impact</h2>
</div>
</div>
<div class="row">
<div class="col-md-4">
<div class="stat">16860</div>
<div class="bordered"></div>
<p>Patients &amp; Families Assisted</p>
</div>
<div class="col-md-4">
<div class="stat">16860</div>
<div class="bordered"></div>
<p>Patients &amp; Families Assisted</p>
</div>
<div class="col-md-4">
<div class="stat">16860</div>
<div class="bordered"></div>
<p>Patients &amp; Families Assisted</p>
</div>
</div>
</div>
</div>
<div id="heroes">
<?php 
$heroTitle = get_field('hero_title'); 
$heroText = get_field('hero_text');

$heroOneImage = get_field('hero_one_image');
$heroOneTitle = get_field('hero_one_title');
$heroOneContent = get_field('hero_one_content');

$heroTwoImage = get_field('hero_two_image');
$heroTwoTitle = get_field('hero_two_title');
$heroTwoContent = get_field('hero_two_content');

$heroThreeImage = get_field('hero_three_image');
$heroThreeTitle = get_field('hero_three_title');
$heroThreeContent = get_field('hero_three_content');

$heroFourImage = get_field('hero_four_image');
$heroFourTitle = get_field('hero_four_title');
$heroFourContent = get_field('hero_four_content');

$heroFiveImage = get_field('hero_five_image');
$heroFiveTitle = get_field('hero_five_title');
$heroFiveContent = get_field('hero_five_content');
?>
<div class="container">
<div class="row">
<div class="section-title">
<h3 class="text-center"><?php echo $heroTitle; ?></h3>
<div class="bordered"><span><img src="<?php bloginfo('template_directory'); ?>/img/little-logo.png" alt="Little Logo for Border" /></span></div>
<?php echo $heroText; ?>
</div>
</div>
<div class="row">
<div class="col-md-3">
<figure>
<a href="javascript:void();" data-toggle="modal" data-target="#storyModal" class="story-btn" data-image="<?php echo $heroOneImage['url']; ?>" data-story="<?php echo $heroOneContent; ?>" data-title="<?php echo $heroOneTitle; ?>">
    <img src="<?php echo $heroOneImage['url']; ?>" alt="<?php echo $heroOneImage['alt']; ?>"/>
    <figcaption>
        <h2><?php echo $heroOneTitle; ?></h2>
        <p><button data-toggle="modal" data-target="#storyModal"><i class="fa fa-plus-circle"></i></button></p>
    </figcaption>	
    </a>		
</figure>
<figure>
<a href="javascript:void();" data-toggle="modal" data-target="#storyModal" class="story-btn" data-image="<?php echo $heroTwoImage['url']; ?>" data-story="<?php echo $heroTwoContent; ?>" data-title="<?php echo $heroTwoTitle; ?>">
    <img src="<?php echo $heroTwoImage['url']; ?>" alt="<?php echo $heroTwoImage['alt']; ?>"/>
    <figcaption>
        <h2><?php echo $heroTwoTitle; ?></h2>
        <p><button data-toggle="modal" data-target="#storyModal"><i class="fa fa-plus-circle"></i></button></p>
    </figcaption>	
    </a>		
</figure>
</div>
<div class="col-md-6">
<figure>
<a href="javascript:void();" data-toggle="modal" data-target="#storyModal" class="story-btn" data-image="<?php echo $heroThreeImage['url']; ?>" data-story="<?php echo $heroThreeContent; ?>" data-title="<?php echo $heroThreeTitle; ?>">
    <img src="<?php echo $heroThreeImage['url']; ?>" alt="<?php echo $heroThreeImage['alt']; ?>"/>
    <figcaption>
        <h2><?php echo $heroThreeTitle; ?></h2>
        <p><button data-toggle="modal" data-target="#storyModal"><i class="fa fa-plus-circle"></i></button></p>
    </figcaption>	
    </a>		
</figure>
</div>
<div class="col-md-3">
<figure>
    <a href="javascript:void();" data-toggle="modal" data-target="#storyModal" class="story-btn" data-image="<?php echo $heroFourImage['url']; ?>" data-story="<?php echo $heroFourContent; ?>" data-title="<?php echo $heroFourTitle; ?>">
    <img src="<?php echo $heroFourImage['url']; ?>" alt="<?php echo $heroFourImage['alt']; ?>" />
    <figcaption>
        <h2><?php echo $heroFourTitle; ?></h2>
        <p><button data-toggle="modal" data-target="#storyModal"><i class="fa fa-plus-circle"></i></button></p>
    </figcaption>	
    </a>		
</figure>
<figure>
<a href="javascript:void();" data-toggle="modal" data-target="#storyModal" class="story-btn" data-image="<?php echo $heroFiveImage['url']; ?>" data-story="<?php echo $heroFiveContent; ?>" data-title="<?php echo $heroFiveTitle; ?>">
    <img src="<?php echo $heroFiveImage['url']; ?>" alt="<?php echo $heroFiveImage['alt']; ?>"/>
    <figcaption>
        <h2><?php echo $heroFiveTitle; ?></h2>
        <p><button data-toggle="modal" data-target="#storyModal"><i class="fa fa-plus-circle"></i></button></p>
    </figcaption>	
    </a>		
</figure>
</div>
</div>
</div>
</div>
<div id="home-shop">
<?php 
$shopHomeTitle = get_field('shop_home_title'); 
$shopHomeText = get_field('shop_home_content');

$shopHomeOneImage = get_field('shop_home_one_image');
$shopHomeOneTitle = get_field('shop_home_one_title');
$shopHomeOneLink = get_field('shop_home_one_link');

$shopHomeTwoImage = get_field('shop_home_two_image');
$shopHomeTwoTitle = get_field('shop_home_two_title');
$shopHomeTwoLink = get_field('shop_home_two_link');

$shopHomeThreeImage = get_field('shop_home_three_image');
$shopHomeThreeTitle = get_field('shop_home_three_title');
$shopHomeThreeLink = get_field('shop_home_three_link');

$shopHomeFourImage = get_field('shop_home_four_image');
$shopHomeFourTitle = get_field('shop_home_four_title');
$shopHomeFourLink = get_field('shop_home_four_link');

$shopHomeFiveImage = get_field('shop_home_five_image');
$shopHomeFiveTitle = get_field('shop_home_one_title');
$shopHomeFiveLink = get_field('shop_home_one_link');

$shopHomeSixImage = get_field('shop_home_six_image');
$shopHomeSixTitle = get_field('shop_home_six_title');
$shopHomeSixLink = get_field('shop_home_six_link');
?>
<div class="container-fluid">
<div class="row">
<div class="section-title">
<h3><?php echo $shopHomeTitle; ?></h3>
<div class="bordered"><span><img src="<?php bloginfo('template_directory'); ?>/img/little-logo.png" alt="Little Logo for Border" /></span></div>
<?php echo $shopHomeText; ?>
</div>
</div>
    <div class="row">
        <div class="col-sm-6 col-md-2">
            <div class="featured-cat-wrap">
                <a href="<?php echo $shopHomeOneUrl; ?>" title="<?php echo $shopHomeOneTitle; ?>">
                    <img src="<?php echo $shopHomeOneImage['url']; ?>" alt="<?php echo $shopHomeOneImage['alt']; ?>" class="img-fluid aligncenter" />
                    <h4><?php echo $shopHomeOneTitle; ?></h4>
                </a>
            </div>
        </div>
        <div class="col-sm-6 col-md-2">
            <div class="featured-cat-wrap">
                <a href="<?php echo $shopHomeTwoUrl; ?>" title="<?php echo $shopHomeTwoTitle; ?>">
                    <img src="<?php echo $shopHomeTwoImage['url']; ?>" alt="<?php echo $shopHomeTwoImage['alt']; ?>" class="img-fluid aligncenter" />
                    <h4><?php echo $shopHomeTwoTitle; ?></h4>
                </a>
            </div>
        </div>
        <div class="col-sm-6 col-md-2">
            <div class="featured-cat-wrap">
                <a href="<?php echo $shopHomeThreeUrl; ?>" title="<?php echo $shopHomeThreeTitle; ?>">
                    <img src="<?php echo $shopHomeThreeImage['url']; ?>" alt="<?php echo $shopHomeThreeImage['alt']; ?>" class="img-fluid aligncenter" />
                    <h4><?php echo $shopHomeThreeTitle; ?></h4>
                </a>
            </div>
        </div>
        <div class="col-sm-6 col-md-2">
            <div class="featured-cat-wrap">
                <a href="<?php echo $shopHomeFourUrl; ?>" title="<?php echo $shopHomeFourTitle; ?>">
                    <img src="<?php echo $shopHomeFourImage['url']; ?>" alt="<?php echo $shopHomeFourImage['alt']; ?>" class="img-fluid aligncenter" />
                    <h4><?php echo $shopHomeFourTitle; ?></h4>
                </a>
            </div>
        </div>
        <div class="col-sm-6 col-md-2">
            <div class="featured-cat-wrap">
                <a href="<?php echo $shopHomeFiveUrl; ?>" title="<?php echo $shopHomeFiveTitle; ?>">
                    <img src="<?php echo $shopHomeFiveImage['url']; ?>" alt="<?php echo $shopHomeFiveImage['alt']; ?>" class="img-fluid aligncenter" />
                    <h4><?php echo $shopHomeFiveTitle; ?></h4>
                </a>
            </div>
        </div>
        <div class="col-sm-6 col-md-2">
            <div class="featured-cat-wrap">
                <a href="<?php echo $shopHomeSixUrl; ?>" title="<?php echo $shopHomeSixTitle; ?>">
                    <img src="<?php echo $shopHomeSixImage['url']; ?>" alt="<?php echo $shopHomeSixImage['alt']; ?>" class="img-fluid aligncenter" />
                    <h4><?php echo $shopHomeSixTitle; ?></h4>
                </a>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="text-center"><a class="btn btn-primary" href="<?php bloginfo('url'); ?>/shop/" title="Shop HEADstrong">Shop All</a></div>
        </div>
    </div>
</div>
</div>
<div id="articles">
<div class="container">
<div class="row">
    <div class="col-md-6">
        <div class="row">
            <div class="col-md-12">
                <div class="section-title">
                    <h3 class="text-center">Our HEADlines</h3>
                    <div class="bordered"><span><img src="<?php bloginfo('template_directory'); ?>/img/little-logo.png" alt="Little Logo for Border" /></span></div>
                </div>
            </div>
        </div>
        <div class="row">
        <?php
        $args = array(
            'posts_per_page'         => '2',
            'cat' => '109'
        );

        // The Query
        $query = new WP_Query( $args );

        // The Loop
        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
                $thumb_id = get_post_thumbnail_id();
                $thumb_url_array = wp_get_attachment_image_src($thumb_id, 'thumbnail-size', true);
                $thumb_url = $thumb_url_array[0];
                ?>
                <div class="col">
                    <div class="entry">
                        <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
                            <div class="featured-image">
                            <?php if($thumb_url == default_image()){ ?>
                                    <img src="<?php bloginfo('template_directory'); ?>/screenshot.png" alt="<?php the_title(); ?>" class="aligncenter img-fluid" />
                                <?php }else{ ?>
                                    <img src="<?php echo $thumb_url; ?>" alt="<?php the_title(); ?>" class="aligncenter img-fluid" />
                                <?php } ?>
                            </div>
                            <div class="entry-content">
                                <h4><?php the_title(); ?></h4>
                                <button class="btn btn-primary">Read More</button>
                            </div>
                        </a>
                    </div>
                </div>
                <?php
            }
        } else {
            // no posts found
        }

        // Restore original Post Data
        wp_reset_postdata();
        ?>
        </div>
    </div>
    <div class="col-md-6">
    <div class="row">
            <div class="col-md-12">
                <div class="section-title">
                    <h3 class="text-center">Upcoming Events</h3>
                    <div class="bordered"><span><img src="<?php bloginfo('template_directory'); ?>/img/little-logo.png" alt="Little Logo for Border" /></span></div>
                </div>
            </div>
        </div>
        <div class="row">
        <?php
        $args = array(
            'posts_per_page'         => '2',
            'cat' => '103'
        );

        // The Query
        $query = new WP_Query( $args );

        // The Loop
        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
                $thumb_id = get_post_thumbnail_id();
                $thumb_url_array = wp_get_attachment_image_src($thumb_id, 'thumbnail-size', true);
                $thumb_url = $thumb_url_array[0];
                ?>
                <div class="col">
                    <div class="entry">
                        <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
                            <div class="featured-image">
                                <?php if($thumb_url == default_image()){ ?>
                                    <img src="<?php bloginfo('template_directory'); ?>/screenshot.png" alt="<?php the_title(); ?>" class="aligncenter img-fluid" />
                                <?php }else{ ?>
                                    <img src="<?php echo $thumb_url; ?>" alt="<?php the_title(); ?>" class="aligncenter img-fluid" />
                                <?php } ?>
                                
                            </div>
                            <div class="entry-content">
                                <h4><?php the_title(); ?></h4>
                                <button class="btn btn-primary">Read More</button>
                            </div>
                        </a>
                    </div>
                </div>
                <?php
            }
        } else {
            // no posts found
        }

        // Restore original Post Data
        wp_reset_postdata();
        ?>
        </div>
    </div>
</div>
</div>
</div>

<div class="modal fade" id="storyModal" tabindex="-1" role="dialog" aria-labelledby="storyModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      <div class="modal-header">
        
      </div>
      <div class="modal-body">

      </div>
      <div class="modal-footer">
        <a class="btn btn-primary" href="<?php bloginfo('url'); ?>/donate/">Donate Now</a>
      </div>
    </div>
  </div>
</div>