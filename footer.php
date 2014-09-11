<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package _bootstraps
 * @package _bootstraps - 2013 1.0
 */
?>
</div>
</div>

<!-- FOOTER BEGIN -->
<section class="footer">
	<div class="row-2 wrapper">
		<div class="row-item row-2">
			<div class="row-item">
				<img class="logo" src="<?php echo get_template_directory_uri(); ?>/images/logo.png"></img>
				<h3><strong>SUNSHINE</strong> Limited</h3>
					<div class="footer-info footer-info-about">
						<?php 
							$post = get_post(7);
							$content = $post->post_content;

							echo $content;
						?>
					</div>
			</div>
			<div class="row-item">
				<h3>Connect</h3>
				<div class="footer-info footer-info-connect">
						<?php 
							$post = get_post(11);
							$content = $post->post_content;

							echo $content;
						?>
					</div>
			</div>
		</div>

		<div class="row-item row-3">
			<div class="row-item">
				<h3>Distributors</h3>
				<div class="footer-info footer-info-distributors">
						<?php 
							$post = get_post(1123);
							$content = $post->post_content;

							echo $content;
						?>
					</div>
			</div>
			<div class="row-item">
				<h3>Cart</h3>
			</div>
			<div class="row-item">
				<h3>Audio</h3>
				<div class="audio"></div>
			</div>
		</div>

	</div>
</section>

<?php wp_footer(); ?>

</body>
</html>
