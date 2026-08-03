<?php
/**
 * Plugin Name: CalculatorAI Embed
 * Description: Shortcode for embedding any CalculatorAI calculator. [calculatorai slug="mortgage-calculator"]
 * Version:     1.0.0
 * License:     MIT
 * Plugin URI:  https://github.com/calculatoraiapp/docs
 *
 * Usage:
 *   [calculatorai slug="mortgage-calculator"]
 *   [calculatorai slug="compound-interest-calculator" lang="es" currency="EUR" theme="auto" width="1600"]
 *
 * Slugs: https://github.com/calculatoraiapp/docs/blob/main/docs/calculators.md
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'CALCULATORAI_SITE', 'https://calculatorai.app' );

/**
 * Registers the front-end script once, on demand.
 */
function calculatorai_register_assets() {
	wp_register_script(
		'calculatorai-embed',
		plugins_url( 'calculatorai-embed.js', __FILE__ ),
		array(),
		'1.0.0',
		true
	);
}
add_action( 'init', 'calculatorai_register_assets' );

/**
 * [calculatorai] shortcode.
 */
function calculatorai_shortcode( $atts ) {
	$a = shortcode_atts(
		array(
			'slug'     => '',
			'title'    => 'Calculator',
			'lang'     => '',   // en ru es de fr it pt ja tr zh
			'currency' => '',   // USD EUR GBP CAD AUD CHF JPY PLN INR BRL
			'theme'    => '',   // light | dark | auto
			'width'    => '1600',
			'credit'   => 'yes',
		),
		$atts,
		'calculatorai'
	);

	$slug = sanitize_title( $a['slug'] );
	if ( empty( $slug ) ) {
		return '';
	}

	$query = array();
	if ( ! empty( $a['lang'] ) && 'en' !== $a['lang'] ) {
		$query['lang'] = sanitize_key( $a['lang'] );
	}
	if ( ! empty( $a['currency'] ) ) {
		$query['currency'] = strtoupper( sanitize_key( $a['currency'] ) );
	}
	if ( ! empty( $a['theme'] ) && 'light' !== $a['theme'] ) {
		$query['theme'] = sanitize_key( $a['theme'] );
	}

	$src = CALCULATORAI_SITE . '/embed/' . $slug;
	if ( ! empty( $query ) ) {
		$src = add_query_arg( $query, $src );
	}

	$title = sanitize_text_field( $a['title'] );
	$width = absint( $a['width'] ) ? absint( $a['width'] ) : 1600;

	wp_enqueue_script( 'calculatorai-embed' );

	ob_start();
	?>
	<div class="calculatorai-embed" data-slug="<?php echo esc_attr( $slug ); ?>" data-site="<?php echo esc_attr( CALCULATORAI_SITE ); ?>" style="max-width:<?php echo esc_attr( $width ); ?>px;margin:0 auto">
		<iframe
			src="<?php echo esc_url( $src ); ?>"
			title="<?php echo esc_attr( $title . ' — CalculatorAI' ); ?>"
			width="100%"
			height="720"
			style="border:1px solid #e5e7eb;border-radius:16px;width:100%;min-width:320px"
			loading="lazy"
			referrerpolicy="strict-origin-when-cross-origin"
		></iframe>
		<?php if ( 'no' !== $a['credit'] ) : ?>
			<p style="font:400 13px/1.5 system-ui,sans-serif;margin:8px 0 0;text-align:right">
				<a href="<?php echo esc_url( CALCULATORAI_SITE . '/calculators' ); ?>" target="_blank" rel="noopener"><?php echo esc_html( $title . ' by CalculatorAI' ); ?></a>
			</p>
		<?php endif; ?>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'calculatorai', 'calculatorai_shortcode' );
