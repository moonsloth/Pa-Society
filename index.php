<?php get_template_part('includes/header'); ?>
<?php get_template_part('includes/page', 'header'); ?>
<?php
	$layout = get_field('page_layout');
?>
<div id="main-content">

  <div class="container">
    <div class="row justify-content-between">
    	<div class="col-md-8">
			<div id="content" role="main">
				<?php get_template_part('includes/loops/content', get_post_format()); ?>
			</div><!-- /#content -->
		</div>
    
		<div class="col-md-3 sidebar">
			<?php get_template_part('includes/sidebar'); ?>
		</div>
    
		</div><!-- /.row -->
	</div><!-- /.container -->
	
</div>
<style>
.navbar {
    background-color: #7f7f7f !important;
}
</style>
<?php get_template_part('includes/footer'); ?>
