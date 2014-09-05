<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package _bootstraps
 * @package _bootstraps - 2013 1.0
 */
get_header();
?>

<div class="intro">
	<img class="logo" src="<?php echo get_template_directory_uri(); ?>/images/logo.png"></img>
	<h1 class="intro-title">sunshine ltd.</h1>
</div>

<div id="posts" class="wrapper">
	<div id="left" style="float: left; width: 40%;"></div>
	<div id="single" style="float: left; width: 40%;"></div>
</div>

<?php get_template_part( 'templates' ); ?>
<?php get_footer(); ?>