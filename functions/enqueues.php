<?php

function be_theme_enqueues() {

	wp_register_style('fontawesome', 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', false, '3.3.4', null);
	wp_enqueue_style('fontawesome');


	wp_register_style('be_theme-css', get_template_directory_uri() . '/assets/css/app.css', false, null);
	wp_register_style('be_theme-css2', get_template_directory_uri() . '/assets/css/styles.css', false, null);

	wp_enqueue_style('be_theme-css');
	wp_enqueue_style('be_theme-css2');


	wp_register_script('be_theme-js', get_template_directory_uri() . '/assets/js/script.js', false, null, true);
	wp_enqueue_script('be_theme-js');

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'be_theme_enqueues', 100);
