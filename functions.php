<?php


/**
 * _bootstraps - 2013 functions and definitions
 *
 * @package _bootstraps
 * @package _bootstraps - 2013 1.0
 */

/**
 * Bootstrap Theme Class
 *
 * @package _bootstraps - 2013 1.0
 */
class WeDevs_Bootstrap {

    function __construct() {
        add_action( 'after_setup_theme', array($this, 'setup_theme') );
        add_action( 'wp_enqueue_scripts', array($this, 'enqueue_scripts') );
        add_action( 'widgets_init', array($this, 'widgets_init') );
        remove_action( 'wp_head', 'wp_generator' );

        add_filter( 'post_link', array($this, 'filter_post_link' ) );
        add_filter( 'page_link', array($this, 'filter_page_link' ), 10, 2 );

        add_action( 'wp_ajax_wpbb_new_comment', array($this, 'add_new_comment' ) );
        add_action( 'wp_ajax_nopriv_wpbb_new_comment', array($this, 'add_new_comment' ) );
    }

    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which runs
     * before the init hook. The init hook is too late for some features, such as indicating
     * support post thumbnails.
     *
     * @package _bootstraps - 2013 1.0
     */
    function setup_theme() {

        /**
         * Load bootstrap menu walker class
         */
        // require_once dirname( __FILE__ ) . '/lib/bootstrap-walker.php';

        /**
         * Make theme available for translation
         * Translations can be filed in the /languages/ directory
         * If you're building a theme based on Tareq\'s Planet - 2013, use a find and replace
         * to change 'tp' to the name of your theme in all the template files
         */
        load_theme_textdomain( 'wpbb', get_template_directory() . '/languages' );

        /**
         * Add default posts and comments RSS feed links to head
         */
        add_theme_support( 'automatic-feed-links' );

        /**
         * Enable support for Post Thumbnails
         */
        add_theme_support( 'post-thumbnails' );

        /**
         * This theme uses wp_nav_menu() in one location.
         */
        register_nav_menus( array(
            'primary' => __( 'Primary Menu', 'wpbb' ),
        ) );

        /**
         * Add support for the Aside Post Formats
         */
        add_theme_support( 'post-formats', array('aside',) );
    }

    /**
     * Enqueue scripts and styles
     */
    function enqueue_scripts() {
        // cache the directory path, maybe helpful?
        $template_directory = get_template_directory_uri();

        // all styles
        // wp_enqueue_style( 'bootstrap', $template_directory . '/css/bootstrap.css' );
        wp_enqueue_style( 'style', $template_directory . '/css/style.css' );

        // all scripts
        wp_enqueue_script( 'wp-api');
        wp_enqueue_script( 'backbone');
        wp_enqueue_script( 'underscore');

        // comment reply on single posts
        // if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        //     wp_enqueue_script( 'comment-reply' );
        // }

        wp_enqueue_script( 'theme-script', $template_directory . '/scripts/app.js', array('jquery'), '20120206', true );
        wp_enqueue_script( 'theme-scroll', $template_directory . '/scripts/jquery.fs.scroller.min.js', array('jquery'), '20120206', true );
        // wp_localize_script( 'theme-script', 'wedevsBackbone', array(
        //     'base' => home_url( '/' ),
        //     'ajaxurl' => admin_url( 'admin-ajax.php' ),
        //     'loggedin' => is_user_logged_in() ? 'yes' : 'no'
        // ) );
    }

    /**
     * Register widgetized area and update sidebar with default widgets
     *
     * @package _bootstraps - 2013 1.0
     */
    function widgets_init() {
        register_sidebar( array(
            'name' => __( 'Sidebar', 'wpbb' ),
            'id' => 'sidebar-1',
            'before_widget' => '<aside id="%1$s" class="widget %2$s">',
            'after_widget' => '</aside>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        ) );
    }

    /**
     * Filter post links to fit our permalink structure
     *
     * @param string $permalink
     * @return string permalink
     */
    function filter_post_link( $permalink ) {
        $permalink =  str_replace( home_url(), home_url('/#'), $permalink );

        return $permalink;
    }

    /**
     * Filter page links to fit our permalink structure
     *
     * @param string $permalink
     * @param int $page_id
     * @return string permalink
     */
    function filter_page_link( $permalink, $page_id ) {
        $permalink =  str_replace( home_url(), home_url( '/#/page/' . $page_id ), $permalink );

        return $permalink;
    }

    function add_new_comment() {

        $comment_post_ID = isset($_POST['comment_post_ID']) ? (int) $_POST['comment_post_ID'] : 0;
        $post = get_post($comment_post_ID);
        $status = get_post_status($post);
        $status_obj = get_post_status_object($status);

        if ( !comments_open($comment_post_ID) ) {
            do_action('comment_closed', $comment_post_ID);
            wp_send_json_error( __('Sorry, comments are closed for this item.') );
        } elseif ( 'trash' == $status ) {
            do_action('comment_on_trash', $comment_post_ID);
            wp_send_json_error();
        } elseif ( !$status_obj->public && !$status_obj->private ) {
            do_action('comment_on_draft', $comment_post_ID);
            wp_send_json_error();
        } elseif ( post_password_required($comment_post_ID) ) {
            do_action('comment_on_password_protected', $comment_post_ID);
            wp_send_json_error();
        } else {
            do_action('pre_comment_on_post', $comment_post_ID);
        }

        $comment_author       = ( isset($_POST['author']) )  ? trim(strip_tags($_POST['author'])) : null;
        $comment_author_email = ( isset($_POST['email']) )   ? trim($_POST['email']) : null;
        $comment_author_url   = ( isset($_POST['url']) )     ? trim($_POST['url']) : null;
        $comment_content      = ( isset($_POST['comment']) ) ? trim($_POST['comment']) : null;

        // If the user is logged in
        $user = wp_get_current_user();
        if ( $user->exists() ) {
            if ( empty( $user->display_name ) ) {
                $user->display_name = $user->user_login;
            }

            $comment_author       = wp_slash( $user->display_name );
            $comment_author_email = wp_slash( $user->user_email );
            $comment_author_url   = wp_slash( $user->user_url );
            if ( current_user_can('unfiltered_html') ) {
                if ( wp_create_nonce('unfiltered-html-comment_' . $comment_post_ID) != $_POST['_wp_unfiltered_html_comment'] ) {
                    kses_remove_filters(); // start with a clean slate
                    kses_init_filters(); // set up the filters
                }
            }
        } else {
            if ( get_option('comment_registration') || 'private' == $status )
                wp_send_json_error( __('Sorry, you must be logged in to post a comment.') );
        }

        $comment_type = '';

        if ( get_option('require_name_email') && !$user->exists() ) {
            if ( 6 > strlen($comment_author_email) || '' == $comment_author )
                wp_send_json_error( __('<strong>ERROR</strong>: please fill the required fields (name, email).') );
            elseif ( !is_email($comment_author_email))
                wp_send_json_error( __('<strong>ERROR</strong>: please enter a valid email address.') );
        }

        if ( '' == $comment_content )
            wp_send_json_error( __('<strong>ERROR</strong>: please type a comment.') );

        $comment_parent = isset($_POST['comment_parent']) ? absint($_POST['comment_parent']) : 0;

        $commentdata = compact('comment_post_ID', 'comment_author', 'comment_author_email', 'comment_author_url', 'comment_content', 'comment_type', 'comment_parent', 'user_ID');

        $comment_id = wp_new_comment( $commentdata );

        $comment = get_comment($comment_id);
        do_action('set_comment_cookies', $comment, $user);

        $location = empty($_POST['redirect_to']) ? get_comment_link($comment_id) : $_POST['redirect_to'] . '#comment-' . $comment_id;
        $location = apply_filters('comment_post_redirect', $location, $comment);

        wp_send_json_success(array(
            'location' => $location,
            'comment_id' => $comment_id,
            'post_id' => $comment_post_ID
        ));
        exit;
    }

}

$wedevs_bootstrap = new WeDevs_Bootstrap();




add_action( 'init', 'create_post_type' );
function create_post_type() {
    register_post_type( 'sunshine_news',
        array(
            'labels' => array(
                'menu_name' => __( 'News' ),
                'name' => __( 'News' ),
                'singular_name' => __( 'News' ),
                'all_items' => __( 'All News Items' ),
                'add_new_item' => __( 'Add News Item' ),
                'edit_item' => __( 'Edit News Item' ),
                'add_new' => __( 'Add News Item' ),
                'new_item' => __( 'New News Item' ),
                'view_item' => __( 'View News Item' ),
                'search_items' => __( 'Search News Items' ),
                'not_found' => __('No News Items Found' ),
                'not_found_in_trash' => __( 'No News Items Found' )
            ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => '/wp-admin/images/news.png',
                'supports' => array('title'),
        'menu_position' => 5
        )
    );
    register_post_type( 'sunshine_artist',
        array(
            'labels' => array(
                'menu_name' => __( 'Artists' ),
                'name' => __( 'Artist' ),
                'singular_name' => __( 'Artist' ),
                'all_items' => __( 'All Artists' ),
                'add_new_item' => __( 'Add New Artist' ),
                'edit_item' => __( 'Edit Artist Info' ),
                'add_new' => __( 'Add New Artist' ),
                'new_item' => __( 'New Artist' ),
                'view_item' => __( 'View Artist' ),
                'search_items' => __( 'Search Artists' ),
                'not_found' => __('No Artists Found' ),
                'not_found_in_trash' => __( 'No Artists Found' )
            ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => '/wp-admin/images/artist.png',
        'menu_position' => 6,
        )
    );
    register_post_type( 'sunshine_product',
        array(
            'labels' => array(
                'menu_name' => __( 'Products' ),
                'name' => __( 'Products' ),
                'singular_name' => __( 'Product' ),
                'all_items' => __( 'All Products' ),
                'add_new_item' => __( 'Add New Product' ),
                'edit_item' => __( 'Edit Product' ),
                'add_new' => __( 'Add New Product' ),
                'new_item' => __( 'New Product' ),
                'view_item' => __( 'View Product' ),
                'search_items' => __( 'Search Products' ),
                'not_found' => __('No Products Found' ),
                'not_found_in_trash' => __( 'No Products Found' )
            ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => '/wp-admin/images/product.png',
        'supports' => array('title','thumbnail'),
        'register_yak_custom_meta_box' => 'add_meta_box_event',
        'rewrite' => false,
        'menu_position' => 7,
        )
    );
}

function add_meta_box_event() {
        add_meta_box('yak','YAK Product 
    Details','yak_editproduct','shop_products','advanced'); // !!! 
}



/**
* "Enter title" field text for custom post types | added: 10.13.12
**/
add_filter('gettext', 'sunshine_custom_rewrites', 10, 4);
function sunshine_custom_rewrites($translation, $text, $domain) {
    global $post;
    if ( ! isset( $post->post_type ) ) {
        return $translation;
    }
        $date = date('m.j.y');
    $translations = &get_translations_for_domain($domain);
    $translation_array = array();

    switch ($post->post_type) {
        case 'sunshine_news':
            $translation_array = array(
            'Enter title here' => $date,
            'Publish' => 'Publish News Item'
                    );
                    break;
        case 'sunshine_artist':
            $translation_array = array(
            'Enter title here' => 'Enter artist name here',
            'Publish' => 'Publish Artist'
                    );
                    break;
        case 'sunshine_product':
            $translation_array = array(
            'Enter title here' => 'Enter product name here (e.g. Temple Bell)',
            'Publish' => 'Publish Product'
                    );
                    break;                                                                                              
    }

    if (array_key_exists($text, $translation_array)) {
        return $translations->translate($translation_array[$text]);
    }
    return $translation;

}
/**
 * set post type 'sunshine_news' title to the current EST date by default | added: 10.19.12
 **/
add_filter( 'default_title', 'sunshine_news_title' );
function sunshine_news_title( $title ) {
    global $post_type;
    $title = date('m.j.y');
    if($post_type == 'sunshine_news'){
        return $title;
    }
}

function wp_api_encode_acf($data,$post,$context){
    $dataNew = get_fields($post['ID']);


    $url = wp_get_attachment_image_src($dataNew['photo'], 'Full');
    // print_r($url);

    $dataNew['photo'] = $url[0];

    $data['custom_meta'] = $dataNew;

    return $data;
}

if( function_exists('get_fields') ){
    add_filter('json_prepare_post', 'wp_api_encode_acf', 10, 3);
} 