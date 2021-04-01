<?php
/*
All the functions are in the PHP pages in the functions/ folder.
*/

require_once locate_template('/functions/cleanup.php');
require_once locate_template('/functions/setup.php');
require_once locate_template('/functions/enqueues.php');
require_once locate_template('/functions/navbar.php');
require_once locate_template('/functions/widgets.php');
require_once locate_template('/functions/search.php');
require_once locate_template('/functions/feedback.php');
require_once locate_template('/functions/woocommerce-setup.php');
require_once locate_template('/functions/wpbakery.php');

add_action('after_setup_theme', 'true_load_theme_textdomain');

function true_load_theme_textdomain()
{
	load_theme_textdomain('be_theme', get_template_directory() . '/languages');
}

// Register Custom Post Type
function portrait_post_type()
{
	$labels = [
		'name' => _x(
			'Gallery Portraits',
			'Post Type General Name',
			'be_portrait'
		),
		'singular_name' => _x(
			'Gallery Portrait',
			'Post Type Singular Name',
			'be_portrait'
		),
		'menu_name' => __('Gallery Portrait', 'be_portrait'),
		'name_admin_bar' => __('Gallery Portrait', 'be_portrait'),
		'archives' => __('Item Archives', 'be_portrait'),
		'attributes' => __('Item Attributes', 'be_portrait'),
		'parent_item_colon' => __('Parent Item:', 'be_portrait'),
		'all_items' => __('All Items', 'be_portrait'),
		'add_new_item' => __('Add New Item', 'be_portrait'),
		'add_new' => __('Add New', 'be_portrait'),
		'new_item' => __('New Item', 'be_portrait'),
		'edit_item' => __('Edit Item', 'be_portrait'),
		'update_item' => __('Update Item', 'be_portrait'),
		'view_item' => __('View Item', 'be_portrait'),
		'view_items' => __('View Items', 'be_portrait'),
		'search_items' => __('Search Item', 'be_portrait'),
		'not_found' => __('Not found', 'be_portrait'),
		'not_found_in_trash' => __('Not found in Trash', 'be_portrait'),
		'featured_image' => __('Featured Image', 'be_portrait'),
		'set_featured_image' => __('Set featured image', 'be_portrait'),
		'remove_featured_image' => __('Remove featured image', 'be_portrait'),
		'use_featured_image' => __('Use as featured image', 'be_portrait'),
		'insert_into_item' => __('Insert into item', 'be_portrait'),
		'uploaded_to_this_item' => __('Uploaded to this item', 'be_portrait'),
		'items_list' => __('Items list', 'be_portrait'),
		'items_list_navigation' => __('Items list navigation', 'be_portrait'),
		'filter_items_list' => __('Filter items list', 'be_portrait'),
	];
	$args = [
		'label' => __('Gallery Portrait', 'be_portrait'),
		'description' => __('Post Type Description', 'be_portrait'),
		'labels' => $labels,
		'supports' => ['title', 'editor'],
		'taxonomies' => ['category', 'post_tag'],
		'hierarchical' => false,
		'public' => true,
		'show_ui' => true,
		'show_in_menu' => true,
		'menu_position' => 5,
		'show_in_admin_bar' => true,
		'show_in_nav_menus' => true,
		'can_export' => true,
		'has_archive' => true,
		'exclude_from_search' => false,
		'publicly_queryable' => true,
		'capability_type' => 'page',
	];
	register_post_type('gallery_post', $args);
}
add_action('init', 'portrait_post_type', 0);
