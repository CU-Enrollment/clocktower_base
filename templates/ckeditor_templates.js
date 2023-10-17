// Override the default template set
CKEDITOR.addTemplates( 'default', {
	// The name of sub folder which hold the shortcut preview images of the
	// templates.  Determine base path of drupal installation if any
	// (ckeditor could possibly be loaded w/o drupalSettings).
	imagesPath: ((drupalSettings && drupalSettings.path) ? drupalSettings.path.baseUrl : '/') + 'themes/custom/Clocktower-UA-Drupal-main/images/ckeditor/',

	// The templates definitions.
	templates: [ {
		title: 'Image and Title module',
		image: 'template1.gif',
		description: 'One main image with a title and text that surround the image.',
		html: '<h3>' +
			// Use src=" " so image is not filtered out by the editor as incorrect (src is required).
			'<img src=" " alt="" style="margin-right: 10px" height="100" width="100" align="left" />' +
			'Type the title here' +
			'</h3>' +
			'<p>' +
			'Type the text here' +
			'</p>'
	},
	{
		title: 'Strange Template',
		image: 'template2.gif',
		description: 'A template that defines two colums, each one with a title, and some text.',
		html: '<table cellspacing="0" cellpadding="0" style="width:100%" border="0">' +
			'<tr>' +
				'<td style="width:50%">' +
					'<h3>Title 1</h3>' +
				'</td>' +
				'<td></td>' +
				'<td style="width:50%">' +
					'<h3>Title 2</h3>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td>' +
					'Text 1' +
				'</td>' +
				'<td></td>' +
				'<td>' +
					'Text 2' +
				'</td>' +
			'</tr>' +
			'</table>' +
			'<p>' +
			'More text goes here.' +
			'</p>'
	},
	{
		title: 'Text and Table',
		image: 'template3.gif',
		description: 'A title with some text and a table.',
		html: '<div style="width: 80%">' +
			'<h3>' +
				'Title goes here' +
			'</h3>' +
			'<table style="width:150px;float: right" cellspacing="0" cellpadding="0" border="1">' +
				'<caption style="border:solid 1px black">' +
					'<strong>Table title</strong>' +
				'</caption>' +
				'<tr>' +
					'<td>&nbsp;</td>' +
					'<td>&nbsp;</td>' +
					'<td>&nbsp;</td>' +
				'</tr>' +
				'<tr>' +
					'<td>&nbsp;</td>' +
					'<td>&nbsp;</td>' +
					'<td>&nbsp;</td>' +
				'</tr>' +
				'<tr>' +
					'<td>&nbsp;</td>' +
					'<td>&nbsp;</td>' +
					'<td>&nbsp;</td>' +
				'</tr>' +
			'</table>' +
			'<p>' +
				'Type the text here' +
			'</p>' +
			'</div>'
	},
	{
		title: 'Accordion Full',
		image: '',
		description: 'Accordion wrap with accordion items',
		html: 	'<div class="accordion-group">' +
					'<div class="accordion-item">' +
						'<h3><button aria-expanded="false" class="accordion-trigger"><span class="accordion-title">Accordion Item 1</span></button></h3>' +
		  					'<div class="accordion-panel">' +
								'<h4>Accordion Item Header</h4>' +
									'<p>Vivamus aliquam iaculis nulla eget suscipit. Morbi massa eros, tempor non varius sed, accumsan finibus mauris. Fusce lectus nisi, tincidunt sit amet ex in, feugiat euismod tortor. Quisque in leo volutpat, blandit erat id, tristique nibh. Curabitur eu lacus at nulla tincidunt fermentum quis a nulla. Praesent facilisis finibus sapien, quis auctor ipsum volutpat commodo. Vestibulum eleifend congue odio, eget varius risus maximus id. Donec et fermentum ligula, eget sodales sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam condimentum dolor ac massa ornare mollis. Proin congue vel urna nec dapibus. Maecenas a nibh eu ante molestie posuere vitae in metus. Nunc aliquet sem in diam placerat mattis. Aenean ornare massa ac nibh iaculis, eget pretium nunc rutrum.</p>' +
		  					'</div>' +
						'</div>' +
	  				'<div class="accordion-item">' +
						'<h3><button aria-expanded="false" class="accordion-trigger"><span class="accordion-title">Accordion Item 2</span></button></h3>' +
							'<div class="accordion-panel">' +
		  						'<h4>Accordion Item Header</h4>' +
									'<p>Vivamus aliquam iaculis nulla eget suscipit. Morbi massa eros, tempor non varius sed, accumsan finibus mauris. Fusce lectus nisi, tincidunt sit amet ex in, feugiat euismod tortor. Quisque in leo volutpat, blandit erat id, tristique nibh. Curabitur eu lacus at nulla tincidunt fermentum quis a nulla. Praesent facilisis finibus sapien, quis auctor ipsum volutpat commodo. Vestibulum eleifend congue odio, eget varius risus maximus id. Donec et fermentum ligula, eget sodales sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam condimentum dolor ac massa ornare mollis. Proin congue vel urna nec dapibus. Maecenas a nibh eu ante molestie posuere vitae in metus. Nunc aliquet sem in diam placerat mattis. Aenean ornare massa ac nibh iaculis, eget pretium nunc rutrum.</p>' +
							'</div>' +
					'</div> <!-- Insert any new accordions after here -->' +
				'</div>'
	},
	{
		title: 'Title Cards',
		image: '',
		description: 'Simple text cards with arrow icon',
		html: '<div class="title-cards">' +
		'<h2 class="line-bottom">Section Header</h2>' +
		'<ul class="card-grid title-cards grid-3">' + 
		'<li><a href="#">Card Name 1</a></li>' + 
		'<li><a href="#">Card Name 2</a></li>' + 
		'<li><a href="#">Card Name 3</a></li>' + 
		'</ul>' +		
		'</div>'
	},
	{
		title: "Notice Reminder",
		image: "",
		description: "General Notice Callout",
		html: '<div class="notice notice--reminder"><span class="notice-text">This is a general notice/reminder</span></div>'
	},
	{
		title: "Notice -- Alert",
		image: "",
		description: "Alert Notice Callout",
		html: '<div class="notice notice--alert"><span class="notice-text">This is an alert</span></div>'
	},
	{
		title: "Notice -- Hint",
		image: "",
		description: "Hint Notice Callout",
		html: '<div class="notice notice--hint"><span class="notice-text">This is a hint</span></div>'
	},
	{
		title: "Top Aside", 
		image: "",
		description: "Aside that goes at the beginning of a body paragraph, it will be at the top of the main content, only one per page",
		html: 	'<aside class="image-aside pull-right top">' +
					'<figure>' +
						'<div class="cover-image"><img alt="Student Climbing on Rockwall" src="https://test-cornell-admissions.pantheonsite.io/sites/default/files/2022-04/2020_1256_007.jpg" /></div>' +
						'<figcaption><span class="byline">By Cornell University Photo</span>' +
							'<p>You are a first-year applicant if you’ll complete high school during the 2021-22 academic year or if you’ve graduated from high school but have earned fewer than 12 credits at a college or university. Before you apply, be sure to review our checklist to make sure you have all the things you need for your application.</p>' +
						'</figcaption>' +
					'</figure>' +
				'</aside>'
	},
	{
		title: "Title Cards",
		image: "",
		description: "These are a list of cards with just a word or two and a arrow",
		html: 	'<div class="title-cards">' +
					'<h2 class="line-bottom">Information For...</h2>' +
						'<ul class="card-grid title-cards grid-3">' +
							'<li><a href="#">Prospective Students</a></li>' +
							'<li><a href="#">Counselors</a></li>' +
							'<li><a href="#">Transfer Students</a></li>' +
							'<li><a href="#">Corgis</a></li>' +
							'<li><a href="#">Alumni</a></li>' +
						'</ul>' +
					'</div>'
	}
 ] 
});
