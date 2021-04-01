<?php

function be_theme_widgets_init() {

  	/*
    Sidebar (one widget area)
     */
    register_sidebar( array(
        'name' => __( 'Sidebar', 'be_theme' ),
        'id' => 'sidebar-widget-area',
        'description' => __( 'The sidebar widget area', 'be_theme' ),
        'before_widget' => '<div class="%1$s %2$s widget">',
        'after_widget' => '</div>',
        'before_title' => '<h4>',
        'after_title' => '</h4>',
    ) );

  	/*
    Footer (three widget areas)
     */
    register_sidebar( array(
        'name' => __( 'Footer', 'be_theme' ),
        'id' => 'footer-widget-area',
        'description' => __( 'The footer widget area', 'be_theme' ),
        'before_widget' => '<div class="%1$s %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h4>',
        'after_title' => '</h4>',
    ) );

    /*
    Page Sidebar
     */
    register_sidebar( array(
        'name' => __( 'Page Sidebar', 'be_theme' ),
        'id' => 'page-widget-area',
        'description' => __( 'The page widget area', 'be_theme' ),
        'before_widget' => '<div class="%1$s %2$s widget">',
        'after_widget' => '</div>',
        'before_title' => '<h4>',
        'after_title' => '</h4>',
    ) );

}
add_action( 'widgets_init', 'be_theme_widgets_init' );
